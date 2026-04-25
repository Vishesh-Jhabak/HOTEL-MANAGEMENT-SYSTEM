-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 05_update_queries.sql
-- Purpose: Various UPDATE query examples
-- ================================================================

USE hotel_management_system;

-- ================================================================
-- 1. UPDATE — Change room status (e.g., mark room as Available)
-- ================================================================
UPDATE rooms
SET status = 'Available'
WHERE room_number = '301';

-- Verify:
SELECT room_number, room_type, status FROM rooms WHERE room_number = '301';

-- ================================================================
-- 2. UPDATE — Update guest contact information
-- ================================================================
UPDATE guests
SET phone = '9999888877',
    address = '100 Marine Drive, Mumbai, Maharashtra'
WHERE email = 'rahul.sharma@email.com';

-- Verify:
SELECT first_name, last_name, phone, address FROM guests WHERE email = 'rahul.sharma@email.com';

-- ================================================================
-- 3. UPDATE — Check out a guest (update reservation + room status)
-- ================================================================
-- Step 1: Update the reservation status
UPDATE reservations
SET status = 'Checked-Out'
WHERE reservation_id = 1;

-- Step 2: Update the room to Available
UPDATE rooms
SET status = 'Available'
WHERE room_id = 2;

-- Verify:
SELECT r.reservation_id, r.status AS res_status, rm.room_number, rm.status AS room_status
FROM reservations r
INNER JOIN rooms rm ON r.room_id = rm.room_id
WHERE r.reservation_id = 1;

-- ================================================================
-- 4. UPDATE — Increase all Deluxe room prices by 10%
-- ================================================================
UPDATE rooms
SET price_per_night = price_per_night * 1.10
WHERE room_type = 'Deluxe';

-- Verify:
SELECT room_number, room_type, price_per_night FROM rooms WHERE room_type = 'Deluxe';

-- ================================================================
-- 5. UPDATE — Mark a room service as completed
-- ================================================================
UPDATE room_services
SET status = 'Completed',
    completed_at = CURRENT_TIMESTAMP
WHERE service_id = 2;

-- Verify:
SELECT service_id, service_type, status, completed_at FROM room_services WHERE service_id = 2;

-- ================================================================
-- 6. UPDATE — Update payment status from Pending to Completed
-- ================================================================
UPDATE payments
SET status = 'Completed'
WHERE payment_id = 5 AND status = 'Pending';

-- Verify:
SELECT payment_id, amount, payment_method, status FROM payments WHERE payment_id = 5;

-- ================================================================
-- 7. UPDATE WITH SUBQUERY — Update total for reservations with
--    partial payments to reflect actual amount paid
-- ================================================================
UPDATE reservations r
SET r.total_amount = (
    SELECT SUM(p.amount)
    FROM payments p
    WHERE p.reservation_id = r.reservation_id
      AND p.status = 'Completed'
)
WHERE r.reservation_id = 4;

-- Verify:
SELECT reservation_id, total_amount, status FROM reservations WHERE reservation_id = 4;
