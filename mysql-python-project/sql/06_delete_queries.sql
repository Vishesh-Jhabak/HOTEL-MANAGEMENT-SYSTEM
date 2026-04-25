-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 06_delete_queries.sql
-- Purpose: Various DELETE query examples
-- ================================================================

USE hotel_management_system;

-- 1. DELETE a cancelled reservation
DELETE FROM reservations WHERE reservation_id = 10 AND status = 'Cancelled';

-- 2. DELETE completed free room services
DELETE FROM room_services WHERE status = 'Completed' AND cost = 0.00;

-- 3. DELETE a specific payment (refund)
DELETE FROM payments WHERE payment_id = 7;

-- 4. CASCADE DELETE — removing a guest cascades to related records
DELETE FROM guests WHERE guest_id = 10;

-- 5. DELETE all cancelled room services
DELETE FROM room_services WHERE status = 'Cancelled';

-- NOTE: Always use WHERE clause to avoid deleting all records!
