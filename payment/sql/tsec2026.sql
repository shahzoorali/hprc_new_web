-- Schema for the IInd Telangana State Equestrian Championship 2026.
-- Mirrors `ecaug2026` (adds horseBreeds column, matching the current handler pair).
-- Run this once on the production MySQL server before go-live. The handlers
-- (tsec2026RequestHandler.php / tsec2026ResponseHandler.php) read and write this table.

CREATE TABLE IF NOT EXISTS `tsec2026` (
  `id`                INT(11) NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(255) DEFAULT NULL,
  `parentName`        VARCHAR(255) DEFAULT NULL,
  `dob`               VARCHAR(32)  DEFAULT NULL,
  `address`           TEXT         DEFAULT NULL,
  `mobile`            VARCHAR(32)  DEFAULT NULL,
  `email`             VARCHAR(255) DEFAULT NULL,
  `emergencyContact`  VARCHAR(32)  DEFAULT NULL,
  `emergencyRelation` VARCHAR(128) DEFAULT NULL,
  `clubName`          VARCHAR(255) DEFAULT NULL,
  `selectedEvents`    TEXT         DEFAULT NULL,
  `eventHorses`       TEXT         DEFAULT NULL,
  `horseBreeds`       TEXT         DEFAULT NULL,
  `stablingType`      VARCHAR(32)  DEFAULT 'NONE',  -- NONE | PERMANENT | TEMPORARY | FULL_CAMP
  `stablingCount`     INT(11)      DEFAULT 0,
  `stablingFrom`      VARCHAR(32)  DEFAULT NULL,
  `stablingTo`        VARCHAR(32)  DEFAULT NULL,
  `ageProofPath`      VARCHAR(512) DEFAULT NULL,
  `headshotPath`      VARCHAR(512) DEFAULT NULL,
  `amount`            VARCHAR(32)  DEFAULT NULL,
  `currency`          VARCHAR(8)   DEFAULT 'INR',
  `order_status`      VARCHAR(64)  DEFAULT NULL,
  `tracking_id`       VARCHAR(128) DEFAULT NULL,
  `bank_ref_no`       VARCHAR(128) DEFAULT NULL,
  `payment_mode`      VARCHAR(64)  DEFAULT NULL,
  `status_message`    VARCHAR(255) DEFAULT NULL,
  `trans_date`        VARCHAR(64)  DEFAULT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_status` (`order_status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
