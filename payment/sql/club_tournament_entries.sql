-- HPRC club tournaments (members-only, individual players, fixed fee).
-- One table for every edition (polo every ~4 months); `tournament` is the edition
-- slug from payment/club_tournaments.php, e.g. 'polo-2026-10'.
-- Run once on the production MySQL server before go-live.
CREATE TABLE IF NOT EXISTS `club_tournament_entries` (
  `id`             INT(11) NOT NULL AUTO_INCREMENT,
  `tournament`     VARCHAR(64)  NOT NULL,
  `name`           VARCHAR(255) DEFAULT NULL,
  `mobile`         VARCHAR(32)  DEFAULT NULL,
  `email`          VARCHAR(255) DEFAULT NULL,
  `membershipNo`   VARCHAR(64)  DEFAULT NULL,
  `handicap`       VARCHAR(64)  DEFAULT NULL,
  `photoPath`      VARCHAR(512) DEFAULT NULL,
  `amount`         VARCHAR(32)  DEFAULT NULL,
  `currency`       VARCHAR(8)   DEFAULT 'INR',
  `order_status`   VARCHAR(64)  DEFAULT NULL,
  `tracking_id`    VARCHAR(128) DEFAULT NULL,
  `bank_ref_no`    VARCHAR(128) DEFAULT NULL,
  `payment_mode`   VARCHAR(64)  DEFAULT NULL,
  `status_message` VARCHAR(255) DEFAULT NULL,
  `trans_date`     VARCHAR(64)  DEFAULT NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_tournament_status` (`tournament`, `order_status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- One-off: carry over entries from the earlier `polo_oct2026` table, keeping ids so
-- any in-flight CCAvenue order still resolves. Run ONCE, only while the new table is
-- empty. Needs polo_oct2026.photoPath (see the ALTER below if it is missing).
-- ALTER TABLE `polo_oct2026` ADD COLUMN `photoPath` VARCHAR(512) DEFAULT NULL AFTER `handicap`;
-- INSERT INTO `club_tournament_entries`
--   (id, tournament, name, mobile, email, membershipNo, handicap, photoPath, amount, currency,
--    order_status, tracking_id, bank_ref_no, payment_mode, status_message, trans_date, created_at)
-- SELECT id, 'polo-2026-10', name, mobile, email, membershipNo, handicap, photoPath, amount, currency,
--    order_status, tracking_id, bank_ref_no, payment_mode, status_message, trans_date, created_at
-- FROM `polo_oct2026`;
