-- HPRC Club Championship (Polo Tournament), 30-31 Oct 2026. Members only.
-- Run once on the production MySQL server before go-live.
CREATE TABLE IF NOT EXISTS `polo_oct2026` (
  `id`             INT(11) NOT NULL AUTO_INCREMENT,
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
  KEY `idx_order_status` (`order_status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- If the table already exists (created before the photo field was added), run:
-- ALTER TABLE `polo_oct2026` ADD COLUMN `photoPath` VARCHAR(512) DEFAULT NULL AFTER `handicap`;
