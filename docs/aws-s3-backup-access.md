# S3 access for CMS backups

`scripts/backup-mongo.sh` dumps the Payload CMS database nightly and tries to
copy it to `s3://hprc.in/hprc-cms/`. The dump and the local retention work; the
upload currently fails with `AccessDenied`, so **there is no offsite copy**.

This is not optional housekeeping. Before the CMS, all site content lived in git
and was recoverable forever. Now it lives in a MongoDB Atlas **M0 (free) cluster,
which gets no automated snapshots**. The only copies that exist are the local
archives in `/home/ubuntu/backups/hprc-cms/` — on the same box as the app.

## How this project authenticates to AWS

There is **no IAM user in use**. Production authenticates with the EC2 **instance
role**:

| | |
| --- | --- |
| Account | `651706741660` |
| Instance role | `hprc-ec2-role` |
| Instance | `i-019d062dc832dc83d` (`t4g.medium`, ap-south-1) |

`payment/mailer.php` reads its SES credentials from **AWS Secrets Manager**
(`SecretId: hprc`, region `ap-south-1`) using that role — it does not read them
from `.env`. The role's permissions are deliberately narrow: it can call
`secretsmanager:GetSecretValue` on that one secret and **nothing else**. It
cannot even `DescribeSecret`.

### Stale credentials — ignore these

Three sets of long-lived keys are lying around, and **all of them are invalid**
(`InvalidClientTokenId`). They are leftovers; nothing in production uses them.

- `~/.aws/credentials` on the developer workstation — profiles `default` and
  `bedrock-cursor`, both key `AKIAZPPF…`
- `/shahruq/home/ubuntu/.aws/credentials` on the EC2 box — an active
  `AKIA44W7…` and a commented-out `AKIAZPPF…` labelled "bbin-s3 user"
- `.env` in the repo — `SES_SMTP_USER=AKIAZPPF…`, a dev-only leftover.
  Production does not read SES config from `.env`.

They are worth deleting, but that is separate from this task.

## What the bucket looks like today

Only one thing could be established without credentials: **anonymous access is
denied.** A request to `https://s3.ap-south-1.amazonaws.com/hprc.in/` with no
credentials returns `403 AccessDenied`, so the bucket is not openly listable.

The bucket policy, ACL, public-access-block and website configuration **could not
be read** — the instance role has no `s3:GetBucketPolicy`,
`s3:GetBucketPublicAccessBlock` or `s3:GetBucketAcl` permission, and no other
working credentials exist. Someone with admin access should confirm those before
the first real backup lands, because the bucket is named after the public domain
and may be serving website assets.

## The fix

Add S3 permissions to the **existing `hprc-ec2-role`**. Do not create a new user
— the backup runs on the instance and picks the role up automatically, which is
already how SES works.

Run these with credentials that can modify IAM (the account root or an admin
profile), replacing `--profile admin` as appropriate.

**1. Save the policy**

```bash
cat > /tmp/hprc-cms-backup-s3.json <<'JSON'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "WriteCmsBackups",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::hprc.in/hprc-cms/*"
    },
    {
      "Sid": "ListOnlyBackupPrefix",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::hprc.in",
      "Condition": { "StringLike": { "s3:prefix": "hprc-cms/*" } }
    }
  ]
}
JSON
```

`GetObject` and the prefix-scoped `ListBucket` are there so a restore can be
pulled back down and verified from the box. Nothing outside `hprc-cms/` is
reachable, and there is no delete permission — a compromised instance cannot
erase the backups it wrote.

**2. Attach it to the role**

```bash
aws iam put-role-policy --profile admin --role-name hprc-ec2-role --policy-name hprc-cms-backup-s3 --policy-document file:///tmp/hprc-cms-backup-s3.json
```

**3. Verify from the EC2 box** (no restart needed — the role is picked up per request)

```bash
ssh aws-shahruq-mumbai '/home/ubuntu/shahzoor/hprc.in/scripts/backup-mongo.sh'
```

Expect `Upload complete` instead of the current
`WARNING: S3 upload failed — local copy kept`.

## Also worth doing

**Confirm the bucket blocks public access**, given it is named after the live
domain:

```bash
aws s3api get-public-access-block --profile admin --bucket hprc.in
aws s3api get-bucket-policy --profile admin --bucket hprc.in
```

If the bucket serves public website assets, put the backups somewhere else
entirely rather than relying on prefix permissions — a bucket policy granting
public read on `*` would expose every dump.

**Add a lifecycle rule** so old dumps age out, mirroring the script's 14-day
local retention:

```bash
aws s3api put-bucket-lifecycle-configuration --profile admin --bucket hprc.in --lifecycle-configuration '{"Rules":[{"ID":"expire-cms-backups","Status":"Enabled","Filter":{"Prefix":"hprc-cms/"},"Expiration":{"Days":90}}]}'
```
