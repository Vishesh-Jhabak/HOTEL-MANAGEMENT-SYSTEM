"""
Hotel Management System — Database Connection Helper
=====================================================
Provides a reusable function to connect to MySQL with proper error handling.
Uses a context manager pattern so connections are always closed cleanly.
"""

import mysql.connector
from mysql.connector import Error
from app.config import DB_CONFIG


def get_connection():
    """
    Create and return a MySQL database connection.

    Returns:
        connection: A MySQL connection object, or None if connection fails.

    Example usage:
        conn = get_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM guests")
            results = cursor.fetchall()
            conn.close()
    """
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"\n[ERROR] Failed to connect to MySQL database!")
        print(f"  Details: {e}")
        print(f"  Host: {DB_CONFIG['host']}:{DB_CONFIG['port']}")
        print(f"  Database: {DB_CONFIG['database']}")
        print("\n  Troubleshooting:")
        print("  1. Make sure MySQL server is running")
        print("  2. Check username and password in app/config.py")
        print("  3. Ensure the database 'hotel_management_system' exists")
        print("     Run: mysql -u root -p < sql/01_create_database.sql")
        return None


def execute_query(query, params=None, fetch=False):
    """
    Execute a SQL query with error handling.

    Args:
        query (str):  The SQL query to execute.
        params (tuple): Optional parameters for parameterized queries.
        fetch (bool): If True, returns fetched results. If False, commits.

    Returns:
        list | int | None:
            - If fetch=True: list of tuples (rows)
            - If fetch=False: lastrowid (for INSERT) or rowcount
            - None on error
    """
    conn = get_connection()
    if not conn:
        return None

    try:
        cursor = conn.cursor()
        cursor.execute(query, params)

        if fetch:
            results = cursor.fetchall()
            return results
        else:
            conn.commit()
            return cursor.lastrowid if cursor.lastrowid else cursor.rowcount

    except Error as e:
        print(f"\n[ERROR] Query execution failed!")
        print(f"  Query: {query[:100]}...")
        print(f"  Error: {e}")
        if conn.is_connected():
            conn.rollback()
        return None

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()


def test_connection():
    """Test the database connection and print status."""
    conn = get_connection()
    if conn:
        info = conn.get_server_info()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()[0]
        print(f"  [OK] Connected to MySQL Server version {info}")
        print(f"  [OK] Database: {db_name}")
        cursor.close()
        conn.close()
        return True
    return False
