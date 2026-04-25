-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 02_create_tables.sql
-- Purpose: Create all 5 tables with PKs, FKs, and constraints
-- ================================================================

USE hotel_management_system;

-- ----------------------------------------------------------------
-- TABLE 1: guests
-- Stores personal information about hotel guests
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS guests (
    guest_id        INT AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(50)  NOT NULL,
    last_name       VARCHAR(50)  NOT NULL,
    email           VARCHAR(100) NOT NULL UNIQUE,
    phone           VARCHAR(15)  NOT NULL,
    address         VARCHAR(255),
    id_proof_type   VARCHAR(30)  NOT NULL DEFAULT 'Aadhar',
    id_proof_number VARCHAR(50)  NOT NULL,
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- TABLE 2: rooms
-- Stores hotel room inventory and current status
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rooms (
    room_id    INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10)   NOT NULL UNIQUE,
    room_type   VARCHAR(30)   NOT NULL,          -- Single, Double, Suite, Deluxe, Presidential
    floor       INT           NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    status      VARCHAR(20)   NOT NULL DEFAULT 'Available',  -- Available, Occupied, Maintenance, Housekeeping
    amenities   VARCHAR(255),
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- TABLE 3: reservations
-- Links guests to rooms with check-in/check-out dates
-- Foreign Keys: guest_id -> guests, room_id -> rooms
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id  INT AUTO_INCREMENT PRIMARY KEY,
    guest_id        INT          NOT NULL,
    room_id         INT          NOT NULL,
    check_in_date   DATE         NOT NULL,
    check_out_date  DATE         NOT NULL,
    num_guests      INT          NOT NULL DEFAULT 1,
    status          VARCHAR(20)  NOT NULL DEFAULT 'Confirmed',  -- Confirmed, Checked-In, Checked-Out, Cancelled
    total_amount    DECIMAL(10,2),
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Key Constraints
    CONSTRAINT fk_reservation_guest
        FOREIGN KEY (guest_id) REFERENCES guests(guest_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_reservation_room
        FOREIGN KEY (room_id) REFERENCES rooms(room_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- TABLE 4: payments
-- Records payment transactions for reservations
-- Foreign Key: reservation_id -> reservations
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
    payment_id      INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id  INT            NOT NULL,
    amount          DECIMAL(10,2)  NOT NULL,
    payment_method  VARCHAR(30)    NOT NULL DEFAULT 'Cash',  -- Cash, Credit Card, Debit Card, UPI, Net Banking
    payment_date    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    status          VARCHAR(20)    NOT NULL DEFAULT 'Completed',  -- Completed, Pending, Refunded, Failed

    -- Foreign Key Constraint
    CONSTRAINT fk_payment_reservation
        FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- TABLE 5: room_services
-- Tracks service requests made by guests for their rooms
-- Foreign Keys: room_id -> rooms, guest_id -> guests
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS room_services (
    service_id    INT AUTO_INCREMENT PRIMARY KEY,
    room_id       INT           NOT NULL,
    guest_id      INT           NOT NULL,
    service_type  VARCHAR(50)   NOT NULL,        -- Food, Laundry, Housekeeping, Maintenance, Spa
    description   VARCHAR(255),
    quantity      INT           NOT NULL DEFAULT 1,
    cost          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status        VARCHAR(20)   NOT NULL DEFAULT 'Pending',  -- Pending, In-Progress, Completed, Cancelled
    requested_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    completed_at  TIMESTAMP     NULL,

    -- Foreign Key Constraints
    CONSTRAINT fk_service_room
        FOREIGN KEY (room_id) REFERENCES rooms(room_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_service_guest
        FOREIGN KEY (guest_id) REFERENCES guests(guest_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================================
-- SUMMARY OF RELATIONSHIPS:
--
--   guests  ──(1:N)──>  reservations  <──(N:1)──  rooms
--                             │
--                          (1:N)
--                             │
--                             ▼
--                         payments
--
--   guests  ──(1:N)──>  room_services  <──(N:1)──  rooms
--
-- ================================================================
