# AWS access for CMS backups and SES

`scripts/backup-mongo.sh` dumps the Payload CMS database nightly to
`s3://hprc.in/hprc-cms/`, and `payment/mailer.php` reads its SES SMTP
credentials from AWS Secrets Manager (`SecretId: hprc`). Both are now working
and verified end to end (2026-09-01).

This is not optional housekeeping. Before the CMS, all site content lived in
git and was recoverable forever. Now it lives in a MongoDB Atlas **M0 (free)
cluster, which gets no automated snapshots** — the nightly S3 upload is the
only offsite copy that exists.

## How this project authenticates to AWS

**IAM user `hprc-site-new`**, not an instance role.

| | |
| --- | --- |
| Account | `651706741660` |
| IAM user | `arn:aws:iam::651706741660:user/hprc-site-new` |
| Also a member of | `AWSSESSendingGroupDoNotRename` (SES sending) |
| Instance | `i-019d062dc832dc83d` (`t4g.medium`, ap-south-1) |

This changed on 2026-09-01. Production originally ran on an **EC2 instance
role**, `hprc-ec2-role`, which was deleted from the AWS console outside of any
change made here. Deleting it broke both `mailer.php` (Secrets Manager) and the
S3 backup immediately — every credential request from the box returned
`InvalidClientTokenId` — including registration confirmation emails, until this
was fixed the same day. The instance's metadata service still *advertises* a
role named `hprc-ec2-role`, but the underlying role no longer exists, so that
name is meaningless — don't be misled by it into thinking a role is available.

The fix moved authentication onto `hprc-site-new`, scoped to exactly what it
needs via two inline policies:

- **`hprc-cms-backup-s3`** — `PutObject`/`GetObject` on
  `arn:aws:s3:::hprc.in/hprc-cms/*` only, plus `ListBucket` conditioned to that
  prefix. No delete permission, so a compromised box cannot erase backups it
  already wrote.
- **`hprc-secrets-read`** — `GetSecretValue` on the `hprc` secret ARN
  (`arn:aws:secretsmanager:ap-south-1:651706741660:secret:hprc-ZWNbj1`) only.

A dedicated access key pair for that user lives on the EC2 box in two places,
matching how `ADMIN_API_TOKEN` was already configured there:

- `~/.aws/credentials` (the `ubuntu` user) — used by the AWS CLI and
  `backup-mongo.sh`.
- `env[AWS_ACCESS_KEY_ID]` / `env[AWS_SECRET_ACCESS_KEY]` in
  `/etc/php/8.4/fpm/pool.d/www.conf` — used by `mailer.php`'s AWS SDK. A backup
  of the previous `www.conf` was left alongside it before editing.

**This is a real trade-off, made deliberately after the role was deleted and
no equivalent was available.** Static, long-lived credentials now live on a box
that also serves the public site — a role's temporary, auto-rotating
credentials never touch disk and can't be exfiltrated that way. If the box is
ever compromised, the fix is to rotate the key:

```bash
aws iam create-access-key --user-name hprc-site-new --query "AccessKey.{Id:AccessKeyId,Secret:SecretAccessKey}" --output json | \
  ssh aws-shahruq-mumbai 'cat > /tmp/_awskey.json'
# then update ~/.aws/credentials and the php-fpm pool env on the box,
# reload php8.4-fpm, and delete the old key:
aws iam delete-access-key --user-name hprc-site-new --access-key-id <OLD_KEY_ID>
```

Recreating an instance role and moving back to it is the more durable fix, if
wanted later — ask before doing it, since it changes how the box authenticates
again.

### Stale credentials — ignore these

Several sets of long-lived keys are lying around from before this fix, and
**all of them are invalid** except the current active pair described above:

- `~/.aws/credentials` on the developer workstation, profile `bedrock-cursor`
  (`default` there is now the admin `cursor-admin` user, which is valid and
  was used to make the IAM/S3 changes below)
- `/shahruq/home/ubuntu/.aws/credentials` on the EC2 box — leftover invalid
  keys, unrelated to the current setup
- `.env` in the repo — `SES_SMTP_USER=AKIAZPPF…`, a dev-only leftover;
  production reads SES config from Secrets Manager, not `.env`

## Bucket security (`hprc.in`)

Hardened on 2026-09-01, using the `cursor-admin` IAM user (full admin, kept off
the server — used only from the workstation to configure AWS resources):

- **Public Access Block** — all four settings enabled. The bucket was found
  with *all four disabled* and **0 objects** in it — no prior public exposure,
  but nothing was stopping one.
- **Versioning** — enabled, so an overwritten or deleted backup object is
  still recoverable.
- **Bucket policy** — denies any request not made over TLS
  (`aws:SecureTransport: false`).
- **Object ownership** — `BucketOwnerEnforced` (ACLs disabled bucket-wide;
  this predates the 2026-09-01 changes and was left as-is).
- **Lifecycle rule** `expire-cms-backups` on the `hprc-cms/` prefix — expires
  objects after 90 days, noncurrent versions after 30, aborts incomplete
  multipart uploads after 7.

## Verifying it still works

```bash
ssh aws-shahruq-mumbai '/home/ubuntu/shahzoor/hprc.in/scripts/backup-mongo.sh'
```

Expect `Upload complete`. `aws s3 ls s3://hprc.in/hprc-cms/` from an
authenticated workstation profile should show the new object.

For Secrets Manager / email, a read-only check (does not send mail):

```bash
ssh aws-shahruq-mumbai 'cd /home/ubuntu/shahzoor/hprc.in && php -r "
require \"payment/vendor/autoload.php\";
use Aws\SecretsManager\SecretsManagerClient;
\$c = new SecretsManagerClient([\"region\"=>\"ap-south-1\",\"version\"=>\"latest\"]);
\$r = \$c->getSecretValue([\"SecretId\"=>\"hprc\"]);
echo \"ok: \" . count(json_decode(\$r[\"SecretString\"], true)) . \" keys\n\";
"'
```
