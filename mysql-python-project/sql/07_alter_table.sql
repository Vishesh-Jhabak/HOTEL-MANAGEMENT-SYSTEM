-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 07_alter_table.sql
-- Purpose: ALTER TABLE examples
-- ================================================================

USE hotel_management_system;

-- 1. ADD COLUMN — Add nationality to guests
ALTER TABLE guests ADD COLUMN nationality VARCHAR(50) DEFAULT 'Indian';

-- 2. MODIFY COLUMN — Increase email field size
ALTER TABLE guests MODIFY COLUMN email VARCHAR(150) NOT NULL;

-- 3. ADD COLUMN — Add rating to rooms
ALTER TABLE rooms ADD COLUMN rating DECIMAL(2,1) DEFAULT 4.0;

-- 4. ADD INDEX — Index on reservation status for faster queries
ALTER TABLE reservations ADD INDEX idx_status (status);

-- 5. DROP COLUMN — Remove the rating column
ALTER TABLE rooms DROP COLUMN rating;

-- 6. RENAME COLUMN — Rename id_proof_type to document_type
ALTER TABLE guests RENAME COLUMN id_proof_type TO document_type;

-- 7. ADD CHECK CONSTRAINT (MySQL 8.0+)
ALTER TABLE rooms ADD CONSTRAINT chk_price CHECK (price_per_night > 0);

-- Verify changes:
DESCRIBE guests;
DESCRIBE rooms;
SHOW INDEX FROM reservations;
