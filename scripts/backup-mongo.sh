#!/usr/bin/env bash
#
# Nightly backup of the Payload CMS content database.
#
# WHY THIS EXISTS: the CMS runs on a MongoDB Atlas M0 (free) cluster, and the
# shared tiers get NO automated snapshots. Before the CMS, all site content was
# versioned in git and recoverable forever. After it, this script is the only
# thing standing between a bad delete and permanent content loss. Payload keeps
# per-document version history, but that does not survive a dropped collection.
#
# Usage:
#   ./scripts/backup-mongo.sh                 # dump + prune old local copies
#   BACKUP_S3_URI=s3://bucket/path ./scripts/backup-mongo.sh   # also ship offsite
#
# Cron (as ubuntu, 02:30 IST nightly):
#   30 2 * * * /home/ubuntu/shahzoor/hprc.in/scripts/backup-mongo.sh >> /var/log/hprc-mongo-backup.log 2>&1
#
# Requires: mongodb-database-tools (mongodump). Install on Ubuntu 24.04 arm64:
#   wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2404-arm64-100.10.0.deb
#   sudo dpkg -i mongodb-database-tools-*.deb

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-/home/ubuntu/backups/hprc-cms}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"

# Pull just the two settings we need out of the server env file, rather than
# sourcing it — that file also holds the payment app's secrets.
ENV_FILE="${ENV_FILE:-$PROJECT_DIR/.env.production.local}"
read_env() {
  [ -f "$ENV_FILE" ] || return 0
  grep -E "^$1=" "$ENV_FILE" | head -1 | cut -d= -f2-
}

if [ -z "${DATABASE_URI:-}" ]; then
  DATABASE_URI="$(read_env DATABASE_URI)"
fi
if [ -z "${BACKUP_S3_URI:-}" ]; then
  BACKUP_S3_URI="$(read_env BACKUP_S3_URI)"
fi

if [ -z "${DATABASE_URI:-}" ]; then
  echo "[$(date -Is)] ERROR: DATABASE_URI not set and not found in $ENV_FILE" >&2
  exit 1
fi

if ! command -v mongodump >/dev/null 2>&1; then
  echo "[$(date -Is)] ERROR: mongodump not installed (see header for install steps)" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ARCHIVE="$BACKUP_DIR/hprc-cms-$STAMP.archive.gz"

echo "[$(date -Is)] Dumping CMS database -> $ARCHIVE"
mongodump --uri="$DATABASE_URI" --archive="$ARCHIVE" --gzip --quiet

SIZE="$(du -h "$ARCHIVE" | cut -f1)"
echo "[$(date -Is)] Dump complete ($SIZE)"

# Refuse to keep an obviously-empty dump — an empty archive that silently
# replaces good backups is worse than a loud failure.
MIN_BYTES=1024
ACTUAL_BYTES="$(stat -c%s "$ARCHIVE")"
if [ "$ACTUAL_BYTES" -lt "$MIN_BYTES" ]; then
  echo "[$(date -Is)] ERROR: dump is only ${ACTUAL_BYTES}B — refusing to keep it" >&2
  rm -f "$ARCHIVE"
  exit 1
fi

# The offsite copy is deliberately non-fatal. A missing IAM permission or a
# transient S3 error must not abort the run before the local dump is pruned and
# accounted for — a failed upload is a warning, a lost local backup is not.
if [ -n "${BACKUP_S3_URI:-}" ]; then
  if command -v aws >/dev/null 2>&1; then
    echo "[$(date -Is)] Uploading to $BACKUP_S3_URI/"
    if aws s3 cp "$ARCHIVE" "$BACKUP_S3_URI/" --only-show-errors; then
      echo "[$(date -Is)] Upload complete"
    else
      echo "[$(date -Is)] WARNING: S3 upload failed — local copy kept at $ARCHIVE" >&2
      echo "[$(date -Is)] WARNING: this backup is NOT offsite until that is fixed" >&2
    fi
  else
    echo "[$(date -Is)] WARNING: BACKUP_S3_URI set but aws CLI not installed — local copy only" >&2
  fi
else
  echo "[$(date -Is)] NOTE: BACKUP_S3_URI not set — local copies only, on the same box as the app"
fi

DELETED="$(find "$BACKUP_DIR" -name 'hprc-cms-*.archive.gz' -mtime "+$RETENTION_DAYS" -print -delete | wc -l)"
echo "[$(date -Is)] Pruned $DELETED archive(s) older than $RETENTION_DAYS days"
echo "[$(date -Is)] Done. $(find "$BACKUP_DIR" -name 'hprc-cms-*.archive.gz' | wc -l) archive(s) retained."
