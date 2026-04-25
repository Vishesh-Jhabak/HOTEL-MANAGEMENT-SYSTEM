# Hotel Management System — MySQL + Python Integration

A complete, beginner-friendly project demonstrating end-to-end MySQL database integration with a Python application. Designed for academic submission.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Database Design](#database-design)
5. [Setup Instructions](#setup-instructions)
6. [Running the Application](#running-the-application)
7. [SQL Commands Reference](#sql-commands-reference)
8. [Python Application Architecture](#python-application-architecture)
9. [Sample Outputs](#sample-outputs)

---

## Project Overview

This project implements a **Hotel Management System** that uses:
- **MySQL 8.0** as the relational database
- **Python 3.x** as the application language
- **mysql-connector-python** as the database connector

The system manages:
- **Guests** — Personal information of hotel guests
- **Rooms** — Hotel room inventory and status
- **Reservations** — Booking records linking guests to rooms
- **Payments** — Payment transactions for reservations
- **Room Services** — Service requests (food, laundry, spa, etc.)

---

## Prerequisites

Before running this project, ensure you have:

| Software | Version | Download Link |
|----------|---------|---------------|
| MySQL Server | 8.0+ | https://dev.mysql.com/downloads/mysql/ |
| Python | 3.8+ | https://www.python.org/downloads/ |
| pip | (comes with Python) | — |

---

## Project Structure

```
mysql-python-project/
│
├── README.md                       ← This file
├── requirements.txt                ← Python dependencies
│
├── sql/                            ← All SQL files
│   ├── 01_create_database.sql      ← CREATE DATABASE & USE
│   ├── 02_create_tables.sql        ← CREATE TABLE (5 tables, PKs, FKs)
│   ├── 03_insert_data.sql          ← INSERT sample data
│   ├── 04_select_queries.sql       ← SELECT queries with JOINs
│   ├── 05_update_queries.sql       ← UPDATE queries
│   ├── 06_delete_queries.sql       ← DELETE queries
│   └── 07_alter_table.sql          ← ALTER TABLE examples
│
├── app/                            ← Python application
│   ├── __init__.py                 ← Package init
│   ├── config.py                   ← MySQL connection settings
│   ├── db_connection.py            ← Connection helper with error handling
│   ├── models.py                   ← Data classes for each table
│   ├── crud_operations.py          ← Full CRUD functions
│   └── main.py                     ← Interactive CLI menu
│
├── docs/
│   └── database_interaction.md     ← Step-by-step DB interaction guide
│
└── outputs/
    └── sample_output.txt           ← Pre-captured sample outputs
```

---

## Database Design

### Entity-Relationship Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   guests     │──1:N──│   reservations   │──N:1──│    rooms     │
│  (PK: id)    │       │  (PK: id)        │       │  (PK: id)    │
└──────────────┘       │  FK: guest_id    │       └──────┬───────┘
       │               │  FK: room_id     │              │
       │               └───────┬──────────┘              │
       │                       │                         │
       │ 1:N              1:N  │                    1:N  │
       │                       ▼                         │
       │               ┌──────────────────┐              │
       │               │    payments      │              │
       │               │  (PK: id)        │              │
       │               │  FK: reservation │              │
       │               └──────────────────┘              │
       │                                                 │
       └──────────1:N──┌──────────────────┐──N:1─────────┘
                       │  room_services   │
                       │  (PK: id)        │
                       │  FK: room_id     │
                       │  FK: guest_id    │
                       └──────────────────┘
```

### Tables Summary

| Table | Columns | Primary Key | Foreign Keys |
|-------|---------|-------------|--------------|
| `guests` | 9 columns | `guest_id` | — |
| `rooms` | 8 columns | `room_id` | — |
| `reservations` | 9 columns | `reservation_id` | `guest_id` → guests, `room_id` → rooms |
| `payments` | 6 columns | `payment_id` | `reservation_id` → reservations |
| `room_services` | 10 columns | `service_id` | `room_id` → rooms, `guest_id` → guests |

---

## Setup Instructions

### Step 1: Install Python Dependencies

```bash
cd mysql-python-project
pip install -r requirements.txt
```

### Step 2: Create the MySQL Database

Open a terminal and run:

```bash
mysql -u root -p < sql/01_create_database.sql
```

### Step 3: Create the Tables

```bash
mysql -u root -p hotel_management_system < sql/02_create_tables.sql
```

### Step 4: Insert Sample Data

```bash
mysql -u root -p hotel_management_system < sql/03_insert_data.sql
```

### Step 5: Configure Connection (if needed)

Edit `app/config.py` to match your MySQL credentials:

```python
DB_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "root",           # Your MySQL username
    "password": "",           # Your MySQL password
    "database": "hotel_management_system",
}
```

---

## Running the Application

```bash
cd mysql-python-project
python -m app.main
```

You should see the interactive menu:

```
=================================================================
  Hotel Management System v1.0.0
  MySQL + Python Integration Project
=================================================================

  Connecting to MySQL database...
  [OK] Connected to MySQL Server version 8.0.36
  [OK] Database: hotel_management_system

  1. Guest Management
  2. Room Management
  3. Reservation Management
  4. Payment Management
  5. Room Service Management
  0. Exit
```

---

## SQL Commands Reference

| File | SQL Commands | Purpose |
|------|-------------|---------|
| `01_create_database.sql` | `CREATE DATABASE`, `USE` | Create and select database |
| `02_create_tables.sql` | `CREATE TABLE` (×5) | Tables with PKs, FKs, constraints |
| `03_insert_data.sql` | `INSERT INTO` | 55+ sample records |
| `04_select_queries.sql` | `SELECT`, `JOIN`, `GROUP BY` | 12 query examples |
| `05_update_queries.sql` | `UPDATE` | 7 update examples |
| `06_delete_queries.sql` | `DELETE` | 5 delete examples |
| `07_alter_table.sql` | `ALTER TABLE` | 7 alter examples |

---

## Python Application Architecture

### How the App Connects to MySQL

```
config.py          →  Stores connection settings
db_connection.py   →  Creates MySQL connection using mysql.connector
crud_operations.py →  Builds and executes SQL queries
main.py            →  Presents CLI menu, calls CRUD functions
```

### Key Features

- **Parameterized queries** — Prevents SQL injection
- **Error handling** — try/except blocks on every operation
- **Formatted output** — Results displayed as aligned tables
- **Cascading deletes** — Foreign key cascades handled by MySQL

### CRUD Operations per Table

| Table | Create | Read | Update | Delete |
|-------|--------|------|--------|--------|
| guests | `create_guest()` | `read_all_guests()`, `read_guest_by_id()` | `update_guest()` | `delete_guest()` |
| rooms | `create_room()` | `read_all_rooms()`, `read_available_rooms()` | `update_room_status()` | `delete_room()` |
| reservations | `create_reservation()` | `read_all_reservations()` | `update_reservation_status()` | `delete_reservation()` |
| payments | `create_payment()` | `read_all_payments()` | `update_payment_status()` | `delete_payment()` |
| room_services | `create_room_service()` | `read_all_room_services()` | `update_room_service_status()` | `delete_room_service()` |

---

## Sample Outputs

See `outputs/sample_output.txt` for full captured output.

For detailed explanation of how the application interacts with MySQL, see `docs/database_interaction.md`.

---

## Running SQL Files Directly in MySQL

You can also run the SQL files directly in the MySQL command-line client:

```bash
# Run SELECT queries
mysql -u root -p hotel_management_system < sql/04_select_queries.sql

# Run UPDATE queries
mysql -u root -p hotel_management_system < sql/05_update_queries.sql

# Run DELETE queries
mysql -u root -p hotel_management_system < sql/06_delete_queries.sql

# Run ALTER TABLE queries
mysql -u root -p hotel_management_system < sql/07_alter_table.sql
```

---

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| MySQL 8.0 | Relational database |
| Python 3.x | Application programming language |
| mysql-connector-python | Official MySQL connector for Python |
| SQL | Database queries and manipulation |

---

## Author

Hotel Management System — MySQL + Python Integration Project  
Academic Project — Database Management Systems
