-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 03_insert_data.sql
-- Purpose: Insert sample data into all 5 tables
-- ================================================================

USE hotel_management_system;

-- ----------------------------------------------------------------
-- INSERT INTO guests (10 sample guests)
-- ----------------------------------------------------------------
INSERT INTO guests (first_name, last_name, email, phone, address, id_proof_type, id_proof_number) VALUES
('Rahul',    'Sharma',    'rahul.sharma@email.com',    '9876543210', '12 MG Road, Mumbai, Maharashtra',       'Aadhar',   '1234-5678-9012'),
('Priya',    'Patel',     'priya.patel@email.com',     '9876543211', '45 Park Street, Kolkata, West Bengal',   'Passport', 'J1234567'),
('Amit',     'Singh',     'amit.singh@email.com',      '9876543212', '78 Brigade Road, Bangalore, Karnataka',  'Aadhar',   '2345-6789-0123'),
('Sneha',    'Reddy',     'sneha.reddy@email.com',     '9876543213', '23 Banjara Hills, Hyderabad, Telangana', 'PAN Card', 'ABCDE1234F'),
('Vikram',   'Joshi',     'vikram.joshi@email.com',    '9876543214', '56 FC Road, Pune, Maharashtra',          'Aadhar',   '3456-7890-1234'),
('Ananya',   'Gupta',     'ananya.gupta@email.com',    '9876543215', '89 Connaught Place, Delhi',              'Passport', 'K2345678'),
('Rajesh',   'Kumar',     'rajesh.kumar@email.com',    '9876543216', '34 Anna Nagar, Chennai, Tamil Nadu',     'Aadhar',   '4567-8901-2345'),
('Meera',    'Nair',      'meera.nair@email.com',      '9876543217', '67 MG Road, Kochi, Kerala',              'PAN Card', 'FGHIJ5678K'),
('Arjun',    'Deshmukh',  'arjun.deshmukh@email.com',  '9876543218', '12 Law College Road, Pune, Maharashtra', 'Aadhar',   '5678-9012-3456'),
('Kavitha',  'Iyer',      'kavitha.iyer@email.com',    '9876543219', '90 T Nagar, Chennai, Tamil Nadu',        'Passport', 'L3456789');

-- ----------------------------------------------------------------
-- INSERT INTO rooms (15 rooms across 5 types)
-- ----------------------------------------------------------------
INSERT INTO rooms (room_number, room_type, floor, price_per_night, status, amenities) VALUES
('101', 'Single',        1, 2500.00,  'Available',    'AC, TV, WiFi'),
('102', 'Single',        1, 2500.00,  'Occupied',     'AC, TV, WiFi'),
('103', 'Double',        1, 4000.00,  'Available',    'AC, TV, WiFi, Mini Bar'),
('201', 'Double',        2, 4500.00,  'Available',    'AC, TV, WiFi, Mini Bar, Balcony'),
('202', 'Double',        2, 4500.00,  'Occupied',     'AC, TV, WiFi, Mini Bar, Balcony'),
('203', 'Deluxe',        2, 6500.00,  'Available',    'AC, TV, WiFi, Mini Bar, Balcony, Room Service'),
('301', 'Deluxe',        3, 7000.00,  'Maintenance',  'AC, TV, WiFi, Mini Bar, Balcony, Room Service'),
('302', 'Deluxe',        3, 7000.00,  'Available',    'AC, TV, WiFi, Mini Bar, Balcony, Room Service'),
('303', 'Suite',         3, 12000.00, 'Available',    'AC, TV, WiFi, Mini Bar, Balcony, Room Service, Jacuzzi'),
('401', 'Suite',         4, 12000.00, 'Occupied',     'AC, TV, WiFi, Mini Bar, Balcony, Room Service, Jacuzzi'),
('402', 'Suite',         4, 15000.00, 'Available',    'AC, TV, WiFi, Mini Bar, Balcony, Room Service, Jacuzzi, Living Room'),
('501', 'Presidential',  5, 25000.00, 'Available',    'AC, TV, WiFi, Mini Bar, Balcony, Room Service, Jacuzzi, Living Room, Private Pool'),
('502', 'Presidential',  5, 25000.00, 'Occupied',     'AC, TV, WiFi, Mini Bar, Balcony, Room Service, Jacuzzi, Living Room, Private Pool'),
('103A','Single',        1, 2800.00,  'Housekeeping', 'AC, TV, WiFi, Workspace'),
('204', 'Double',        2, 5000.00,  'Available',    'AC, TV, WiFi, Mini Bar, Balcony, Workspace');

-- ----------------------------------------------------------------
-- INSERT INTO reservations (10 sample reservations)
-- ----------------------------------------------------------------
INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, num_guests, status, total_amount) VALUES
(1,  2,  '2025-04-20', '2025-04-23', 1, 'Checked-In',   7500.00),   -- Rahul in Room 102
(2,  5,  '2025-04-21', '2025-04-25', 2, 'Checked-In',   18000.00),  -- Priya in Room 202
(3,  10, '2025-04-19', '2025-04-24', 2, 'Checked-In',   60000.00),  -- Amit in Room 401
(4,  13, '2025-04-18', '2025-04-22', 2, 'Checked-In',   100000.00), -- Sneha in Room 502
(5,  3,  '2025-04-25', '2025-04-28', 1, 'Confirmed',    12000.00),  -- Vikram future booking
(6,  6,  '2025-04-25', '2025-04-27', 2, 'Confirmed',    13000.00),  -- Ananya future booking
(7,  9,  '2025-04-26', '2025-04-30', 2, 'Confirmed',    48000.00),  -- Rajesh future booking
(8,  1,  '2025-04-10', '2025-04-14', 1, 'Checked-Out',  10000.00),  -- Meera past stay
(9,  3,  '2025-04-05', '2025-04-08', 1, 'Checked-Out',  12000.00),  -- Arjun past stay
(10, 8,  '2025-04-15', '2025-04-17', 1, 'Cancelled',    14000.00);  -- Kavitha cancelled

-- ----------------------------------------------------------------
-- INSERT INTO payments (8 sample payments)
-- ----------------------------------------------------------------
INSERT INTO payments (reservation_id, amount, payment_method, status) VALUES
(1,  7500.00,   'UPI',          'Completed'),
(2,  18000.00,  'Credit Card',  'Completed'),
(3,  60000.00,  'Debit Card',   'Completed'),
(4,  50000.00,  'Net Banking',  'Completed'),   -- Partial payment
(4,  50000.00,  'UPI',          'Pending'),      -- Remaining balance
(5,  12000.00,  'Credit Card',  'Completed'),
(8,  10000.00,  'Cash',         'Completed'),
(9,  12000.00,  'UPI',          'Completed');

-- ----------------------------------------------------------------
-- INSERT INTO room_services (12 sample service requests)
-- ----------------------------------------------------------------
INSERT INTO room_services (room_id, guest_id, service_type, description, quantity, cost, status) VALUES
(2,  1,  'Food',         'Breakfast — South Indian Thali',           2,  800.00,  'Completed'),
(2,  1,  'Laundry',      'Shirt ironing and dry cleaning',           3,  450.00,  'In-Progress'),
(5,  2,  'Food',         'Dinner — North Indian Combo for 2',        1,  1500.00, 'Completed'),
(5,  2,  'Spa',          'Full body Ayurvedic massage',              2,  5000.00, 'Pending'),
(10, 3,  'Food',         'Room service — Continental Breakfast',     2,  1200.00, 'Completed'),
(10, 3,  'Housekeeping', 'Extra towels and pillow set',              1,  0.00,    'Completed'),
(10, 3,  'Maintenance',  'AC not cooling properly',                  1,  0.00,    'In-Progress'),
(13, 4,  'Food',         'Lunch — Special Presidential Platter',     2,  3500.00, 'Completed'),
(13, 4,  'Spa',          'Couples Spa Package — Aromatherapy',       1,  8000.00, 'Completed'),
(13, 4,  'Laundry',      'Saree dry cleaning',                      2,  1200.00, 'Pending'),
(2,  1,  'Food',         'Evening Snacks — Veg Pakora and Chai',    1,  350.00,  'Pending'),
(5,  2,  'Housekeeping', 'Room deep cleaning request',               1,  0.00,    'Pending');

-- ================================================================
-- Data Summary:
--   guests:        10 records
--   rooms:         15 records
--   reservations:  10 records
--   payments:       8 records
--   room_services: 12 records
-- ================================================================
