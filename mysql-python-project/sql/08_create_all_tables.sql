-- ================================================================
-- Hotel Management System — All Tables (excluding NF tables)
-- File: 08_create_all_tables.sql
-- ================================================================

CREATE DATABASE IF NOT EXISTS hotel_management;
USE hotel_management;

-- 1. hotel
CREATE TABLE IF NOT EXISTS hotel (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10),
    phone VARCHAR(15),
    email VARCHAR(100),
    star_rating INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. departments
CREATE TABLE IF NOT EXISTS departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hotel_id INT,
    manager_name VARCHAR(100),
    budget DECIMAL(12,2),
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. room_category
CREATE TABLE IF NOT EXISTS room_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    base_price DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. room
CREATE TABLE IF NOT EXISTS room (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL,
    hotel_id INT,
    category_id INT,
    floor_number INT,
    status VARCHAR(20) DEFAULT \'Available\',
    price_per_night DECIMAL(10,2),
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES room_category(category_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. available_rooms (view-like table tracking availability)
CREATE TABLE IF NOT EXISTS available_rooms (
    avail_id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    available_date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. customer
CREATE TABLE IF NOT EXISTS customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    id_proof_type VARCHAR(30) DEFAULT \'Aadhar\',
    id_proof_number VARCHAR(50),
    dob DATE,
    gender VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. staff
CREATE TABLE IF NOT EXISTS staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dept_id INT,
    hotel_id INT,
    position VARCHAR(50),
    salary DECIMAL(10,2),
    phone VARCHAR(15),
    email VARCHAR(100),
    hire_date DATE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. services
CREATE TABLE IF NOT EXISTS services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2),
    category VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. staff_service
CREATE TABLE IF NOT EXISTS staff_service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT,
    service_id INT,
    assigned_date DATE,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. reservation
CREATE TABLE IF NOT EXISTS reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    room_id INT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    num_guests INT DEFAULT 1,
    status VARCHAR(20) DEFAULT \'Confirmed\',
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. reservation_log
CREATE TABLE IF NOT EXISTS reservation_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT,
    action VARCHAR(50),
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    performed_by VARCHAR(100),
    notes VARCHAR(255),
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. payment
CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(30) DEFAULT \'Cash\',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT \'Completed\',
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. invoice
CREATE TABLE IF NOT EXISTS invoice (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT,
    customer_id INT,
    invoice_date DATE,
    total_amount DECIMAL(10,2),
    tax DECIMAL(10,2),
    discount DECIMAL(10,2) DEFAULT 0,
    grand_total DECIMAL(10,2),
    status VARCHAR(20) DEFAULT \'Unpaid\',
    FOREIGN KEY (reservation_id) REFERENCES reservation(reservation_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. customer_payments
CREATE TABLE IF NOT EXISTS customer_payments (
    cp_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    payment_id INT,
    amount_paid DECIMAL(10,2),
    payment_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. payment_method_summary
CREATE TABLE IF NOT EXISTS payment_method_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_method VARCHAR(30),
    total_transactions INT DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,
    month_year VARCHAR(7)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 16. discounts
CREATE TABLE IF NOT EXISTS discounts (
    discount_id INT AUTO_INCREMENT PRIMARY KEY,
    discount_name VARCHAR(100),
    discount_percent DECIMAL(5,2),
    valid_from DATE,
    valid_to DATE,
    applicable_to VARCHAR(50),
    min_stay_nights INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 17. restaurant
CREATE TABLE IF NOT EXISTS restaurant (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(100) NOT NULL,
    hotel_id INT,
    cuisine_type VARCHAR(50),
    capacity INT,
    opening_time TIME,
    closing_time TIME,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 18. bar
CREATE TABLE IF NOT EXISTS bar (
    bar_id INT AUTO_INCREMENT PRIMARY KEY,
    bar_name VARCHAR(100) NOT NULL,
    hotel_id INT,
    bar_type VARCHAR(50),
    capacity INT,
    opening_time TIME,
    closing_time TIME,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 19. pool_access
CREATE TABLE IF NOT EXISTS pool_access (
    access_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    pool_name VARCHAR(50),
    access_date DATE,
    time_slot VARCHAR(20),
    hotel_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 20. transportation
CREATE TABLE IF NOT EXISTS transportation (
    transport_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    vehicle_type VARCHAR(30),
    pickup_location VARCHAR(100),
    drop_location VARCHAR(100),
    pickup_time DATETIME,
    fare DECIMAL(10,2),
    status VARCHAR(20) DEFAULT \'Scheduled\',
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
