-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 04_select_queries.sql
-- Purpose: Various SELECT queries including JOINs
-- ================================================================

USE hotel_management_system;

-- ================================================================
-- 1. BASIC SELECT — View all guests
-- ================================================================
SELECT * FROM guests;

-- ================================================================
-- 2. SELECT WITH WHERE — Find available rooms
-- ================================================================
SELECT room_number, room_type, floor, price_per_night, amenities
FROM rooms
WHERE status = 'Available'
ORDER BY price_per_night ASC;

-- ================================================================
-- 3. SELECT WITH WHERE AND LIKE — Search guests by name
-- ================================================================
SELECT guest_id, first_name, last_name, email, phone
FROM guests
WHERE first_name LIKE 'A%' OR last_name LIKE 'S%';

-- ================================================================
-- 4. INNER JOIN — Reservations with guest and room details
-- ================================================================
SELECT
    r.reservation_id,
    CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
    rm.room_number,
    rm.room_type,
    r.check_in_date,
    r.check_out_date,
    r.status AS reservation_status,
    r.total_amount
FROM reservations r
INNER JOIN guests g ON r.guest_id = g.guest_id
INNER JOIN rooms rm ON r.room_id = rm.room_id
ORDER BY r.check_in_date DESC;

-- ================================================================
-- 5. LEFT JOIN — All guests with their reservations (if any)
-- ================================================================
SELECT
    g.guest_id,
    CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
    g.phone,
    r.reservation_id,
    r.check_in_date,
    r.status AS reservation_status
FROM guests g
LEFT JOIN reservations r ON g.guest_id = r.guest_id
ORDER BY g.guest_id;

-- ================================================================
-- 6. JOIN WITH AGGREGATE — Total payment per guest
-- ================================================================
SELECT
    CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
    COUNT(p.payment_id) AS total_payments,
    SUM(p.amount) AS total_paid,
    GROUP_CONCAT(p.payment_method SEPARATOR ', ') AS payment_methods
FROM guests g
INNER JOIN reservations r ON g.guest_id = r.guest_id
INNER JOIN payments p ON r.reservation_id = p.reservation_id
GROUP BY g.guest_id, g.first_name, g.last_name
ORDER BY total_paid DESC;

-- ================================================================
-- 7. GROUP BY — Room count and average price by room type
-- ================================================================
SELECT
    room_type,
    COUNT(*) AS total_rooms,
    ROUND(AVG(price_per_night), 2) AS avg_price,
    MIN(price_per_night) AS min_price,
    MAX(price_per_night) AS max_price
FROM rooms
GROUP BY room_type
ORDER BY avg_price DESC;

-- ================================================================
-- 8. SUBQUERY — Guests who have spent more than ₹20,000
-- ================================================================
SELECT guest_id, first_name, last_name, email
FROM guests
WHERE guest_id IN (
    SELECT r.guest_id
    FROM reservations r
    INNER JOIN payments p ON r.reservation_id = p.reservation_id
    GROUP BY r.guest_id
    HAVING SUM(p.amount) > 20000
);

-- ================================================================
-- 9. JOIN — Room service details with guest and room info
-- ================================================================
SELECT
    rs.service_id,
    CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
    rm.room_number,
    rs.service_type,
    rs.description,
    rs.cost,
    rs.status AS service_status,
    rs.requested_at
FROM room_services rs
INNER JOIN guests g ON rs.guest_id = g.guest_id
INNER JOIN rooms rm ON rs.room_id = rm.room_id
ORDER BY rs.requested_at DESC;

-- ================================================================
-- 10. AGGREGATE — Revenue summary by reservation status
-- ================================================================
SELECT
    r.status AS reservation_status,
    COUNT(*) AS total_reservations,
    SUM(r.total_amount) AS total_revenue,
    ROUND(AVG(r.total_amount), 2) AS avg_booking_value
FROM reservations r
GROUP BY r.status
ORDER BY total_revenue DESC;

-- ================================================================
-- 11. JOIN — Currently occupied rooms with guest details
-- ================================================================
SELECT
    rm.room_number,
    rm.room_type,
    rm.floor,
    CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
    g.phone,
    r.check_in_date,
    r.check_out_date,
    DATEDIFF(r.check_out_date, r.check_in_date) AS nights_booked
FROM rooms rm
INNER JOIN reservations r ON rm.room_id = r.room_id
INNER JOIN guests g ON r.guest_id = g.guest_id
WHERE r.status = 'Checked-In'
ORDER BY rm.room_number;

-- ================================================================
-- 12. AGGREGATE — Room service costs summary per guest
-- ================================================================
SELECT
    CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
    COUNT(rs.service_id) AS total_requests,
    SUM(rs.cost) AS total_service_cost,
    SUM(CASE WHEN rs.status = 'Completed' THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN rs.status = 'Pending' THEN 1 ELSE 0 END) AS pending
FROM guests g
INNER JOIN room_services rs ON g.guest_id = rs.guest_id
GROUP BY g.guest_id, g.first_name, g.last_name
ORDER BY total_service_cost DESC;
