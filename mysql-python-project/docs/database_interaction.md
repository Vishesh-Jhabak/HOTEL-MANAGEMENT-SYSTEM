# How the Python Application Interacts with MySQL

This document explains step-by-step how the Hotel Management System Python application connects to and communicates with the MySQL database.

---

## Step 1: Configuration (`app/config.py`)

The application starts by reading database connection parameters from `config.py`:

```python
DB_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "hotel_management_system",
}
```

These settings tell Python **where** the MySQL server is running and **which database** to use.

---

## Step 2: Establishing Connection (`app/db_connection.py`)

The `get_connection()` function uses the `mysql-connector-python` library to create a connection:

```python
import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="",
    database="hotel_management_system"
)
```

**What happens internally:**
1. Python opens a TCP socket to `localhost:3306`
2. It performs the MySQL handshake (authentication)
3. It selects the `hotel_management_system` database
4. A connection object is returned for executing queries

**Error Handling:** If MySQL is not running or credentials are wrong, the application catches `mysql.connector.Error` and displays a helpful error message.

---

## Step 3: Executing Queries (`execute_query()`)

The `execute_query()` helper function handles all SQL execution:

```python
def execute_query(query, params=None, fetch=False):
    conn = get_connection()          # Step 1: Connect
    cursor = conn.cursor()           # Step 2: Create cursor
    cursor.execute(query, params)    # Step 3: Execute SQL

    if fetch:
        results = cursor.fetchall()  # Step 4a: Fetch results (for SELECT)
        return results
    else:
        conn.commit()                # Step 4b: Commit changes (for INSERT/UPDATE/DELETE)
        return cursor.lastrowid
```

**Key concepts:**
- **Cursor**: A cursor is like a pointer that executes SQL and fetches results
- **Parameterized queries**: We use `%s` placeholders to prevent SQL injection
- **Commit**: Changes (INSERT/UPDATE/DELETE) must be committed to persist
- **Fetch**: SELECT results are fetched as a list of tuples

---

## Step 4: CRUD Operations (`app/crud_operations.py`)

Each database table has four operations:

### CREATE (INSERT)
```python
def create_guest(first_name, last_name, email, ...):
    query = "INSERT INTO guests (...) VALUES (%s, %s, %s, ...)"
    execute_query(query, (first_name, last_name, email, ...))
```
→ Adds a new row to the table.

### READ (SELECT)
```python
def read_all_guests():
    query = "SELECT * FROM guests ORDER BY guest_id"
    return execute_query(query, fetch=True)
```
→ Returns all rows as a list of tuples.

### UPDATE
```python
def update_guest(guest_id, phone=None, address=None):
    query = "UPDATE guests SET phone = %s WHERE guest_id = %s"
    execute_query(query, (phone, guest_id))
```
→ Modifies existing row(s) matching the WHERE condition.

### DELETE
```python
def delete_guest(guest_id):
    query = "DELETE FROM guests WHERE guest_id = %s"
    execute_query(query, (guest_id,))
```
→ Removes the row. Due to `ON DELETE CASCADE`, related records in reservations, payments, and room_services are also deleted.

---

## Step 5: User Interface (`app/main.py`)

The main application presents an interactive text menu:

```
=================================================================
  Hotel Management System v1.0.0
=================================================================

  1. Guest Management
  2. Room Management
  3. Reservation Management
  4. Payment Management
  5. Room Service Management
  0. Exit
```

When the user selects an option, the corresponding CRUD function is called, and results are displayed in a formatted table.

---

## Data Flow Diagram

```
User Input (CLI Menu)
        │
        ▼
   main.py (Menu Handler)
        │
        ▼
   crud_operations.py (Build SQL Query)
        │
        ▼
   db_connection.py (Execute via mysql.connector)
        │
        ▼
   MySQL Server (Process SQL, Return Results)
        │
        ▼
   db_connection.py (Fetch/Commit)
        │
        ▼
   main.py (Display Formatted Table)
        │
        ▼
   User Sees Output
```

---

## Security: Parameterized Queries

We **never** insert user input directly into SQL strings. Instead:

```python
# BAD (SQL Injection vulnerable):
query = f"SELECT * FROM guests WHERE guest_id = {user_input}"

# GOOD (Parameterized — safe):
query = "SELECT * FROM guests WHERE guest_id = %s"
cursor.execute(query, (user_input,))
```

The MySQL connector automatically escapes special characters, preventing SQL injection attacks.

---

## Connection Lifecycle

```
Open Connection  →  Create Cursor  →  Execute Query  →  Fetch/Commit  →  Close Connection
```

Every query opens a fresh connection and closes it in the `finally` block. This ensures no connections are leaked, even if an error occurs.
