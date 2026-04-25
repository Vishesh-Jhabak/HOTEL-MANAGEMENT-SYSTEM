-- ================================================================
-- Hotel Management System — MySQL Database Integration Project
-- File: 01_create_database.sql
-- Purpose: Create the database and select it for use
-- ================================================================

-- Step 1: Create the database (if it doesn't already exist)
CREATE DATABASE IF NOT EXISTS hotel_management_system;

-- Step 2: Select the database for all subsequent operations
USE hotel_management_system;

-- Verify: After running this file, you should see:
--   Query OK, 1 row affected (or 0 if it already existed)
--   Database changed

-- ================================================================
-- NOTE: Run this file FIRST before running any other SQL files.
-- Command:  mysql -u root -p < sql/01_create_database.sql
-- ================================================================
