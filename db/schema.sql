-- =============================================================
-- Hotel Management System - MySQL Schema
-- =============================================================

-- Create databases (run as root)
CREATE DATABASE IF NOT EXISTS hotel_auth;
CREATE DATABASE IF NOT EXISTS hotel_booking;
CREATE DATABASE IF NOT EXISTS hotel_room;

-- Create application user
CREATE USER IF NOT EXISTS 'hotel'@'localhost' IDENTIFIED BY 'hotel';
GRANT ALL PRIVILEGES ON hotel_auth.* TO 'hotel'@'localhost';
GRANT ALL PRIVILEGES ON hotel_booking.* TO 'hotel'@'localhost';
GRANT ALL PRIVILEGES ON hotel_room.* TO 'hotel'@'localhost';
FLUSH PRIVILEGES;

-- =============================================================
-- auth-service tables
-- =============================================================
USE hotel_auth;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- room-service tables
-- =============================================================
USE hotel_room;

CREATE TABLE IF NOT EXISTS rooms (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(20) NOT NULL UNIQUE,
  status VARCHAR(30) NOT NULL,
  type VARCHAR(50) NOT NULL,
  base_price DECIMAL(10,2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- booking-service tables
-- =============================================================
USE hotel_booking;

CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  room_id BIGINT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

