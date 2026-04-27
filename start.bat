@echo off
title Hotel Management System - Launcher
color 0B

echo ============================================================
echo        HOTEL MANAGEMENT SYSTEM - Startup Script
echo ============================================================
echo.

set MYSQL_BIN=C:\Program Files\MySQL\MySQL Server 8.0\bin
set MYSQL_DATA=%USERPROFILE%\mysql_data

:: ---------------------------------------------------------------
:: 0. Kill any existing services on our ports
:: ---------------------------------------------------------------
echo [0/4] Freeing ports 8081-8084 and 5173...
echo ------------------------------------------------------------
for %%P in (8081 8082 8083 8084 5173) do (
    for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":%%P " ^| findstr "LISTENING"') do (
        echo  Killing PID %%A on port %%P
        taskkill /PID %%A /F >nul 2>&1
    )
)
echo  Ports are free.
echo.

:: ---------------------------------------------------------------
:: 1. Start MySQL if not running
:: ---------------------------------------------------------------
echo [1/4] Starting MySQL Server...
echo ------------------------------------------------------------

:: Check if MySQL is already listening on port 3306
netstat -ano | findstr ":3306 " | findstr "LISTENING" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo  MySQL is already running on port 3306.
) else (
    :: Initialize data directory if it doesn't exist
    if not exist "%MYSQL_DATA%\mysql" (
        echo  Initializing MySQL data directory...
        "%MYSQL_BIN%\mysqld.exe" --initialize-insecure --datadir="%MYSQL_DATA%" --console 2>nul
        echo  MySQL initialized with root (no password).
    )
    echo  Starting MySQL server...
    start "" /B "%MYSQL_BIN%\mysqld.exe" --datadir="%MYSQL_DATA%" --port=3306 --console 2>nul
    echo  Waiting for MySQL to start...
    timeout /t 5 /nobreak >nul

    :: Verify MySQL started
    netstat -ano | findstr ":3306 " | findstr "LISTENING" >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo  ERROR: MySQL failed to start! Check if port 3306 is free.
        pause
        exit /b 1
    )
)
echo  MySQL is running on port 3306.
echo.

:: ---------------------------------------------------------------
:: 1b. Create databases and user if needed
:: ---------------------------------------------------------------
echo  Setting up databases...
python -c "import mysql.connector; c=mysql.connector.connect(host='localhost', user='root', password='1234'); cur=c.cursor(); cur.execute('CREATE DATABASE IF NOT EXISTS hotel_auth'); cur.execute('CREATE DATABASE IF NOT EXISTS hotel_booking'); cur.execute('CREATE DATABASE IF NOT EXISTS hotel_room'); cur.execute('CREATE USER IF NOT EXISTS \'hotel\'@\'localhost\' IDENTIFIED BY \'hotel\''); cur.execute('GRANT ALL PRIVILEGES ON hotel_auth.* TO \'hotel\'@\'localhost\''); cur.execute('GRANT ALL PRIVILEGES ON hotel_booking.* TO \'hotel\'@\'localhost\''); cur.execute('GRANT ALL PRIVILEGES ON hotel_room.* TO \'hotel\'@\'localhost\''); cur.execute('FLUSH PRIVILEGES')" 2>nul
if %ERRORLEVEL% neq 0 (
    color 0C
    echo  ERROR: Could not create databases. Make sure Python mysql.connector is installed and MySQL is accessible.
    pause
    exit /b 1
)
echo  Databases ready: hotel_auth, hotel_booking, hotel_room
echo.

:: ---------------------------------------------------------------
:: 2. Build the project
:: ---------------------------------------------------------------
echo [2/4] Building the project with Maven...
echo ------------------------------------------------------------
call mvn clean install -q
if %ERRORLEVEL% neq 0 (
    color 0C
    echo.
    echo  BUILD FAILED! Fix the errors above and try again.
    echo.
    pause
    exit /b 1
)
echo  Build successful!
echo.

:: ---------------------------------------------------------------
:: 3. Start backend services (each in its own window)
:: ---------------------------------------------------------------
echo [3/4] Starting backend services...
echo ------------------------------------------------------------

echo  Starting Auth Service        (port 8081)...
start "Auth Service - 8081" cmd /k "cd /d %~dp0 && mvn spring-boot:run -pl auth-service"

echo  Starting Booking Service     (port 8082)...
start "Booking Service - 8082" cmd /k "cd /d %~dp0 && mvn spring-boot:run -pl booking-service"

echo  Starting Room Service        (port 8083)...
start "Room Service - 8083" cmd /k "cd /d %~dp0 && mvn spring-boot:run -pl room-service"

echo  Starting Analytics Service   (port 8084)...
start "Analytics Service - 8084" cmd /k "cd /d %~dp0 && mvn spring-boot:run -pl analytics-service"

echo.
echo  All backend services are launching...
echo  Waiting 15 seconds for services to initialise...
timeout /t 15 /nobreak >nul

:: ---------------------------------------------------------------
:: 4. Install frontend dependencies and start dev server
:: ---------------------------------------------------------------
echo.
echo [4/4] Starting frontend (React)...
echo ------------------------------------------------------------

if exist "%~dp0web-frontend\package.json" (
    echo  Installing npm dependencies...
    start "Frontend - 5173" cmd /k "cd /d %~dp0web-frontend && npm install && echo. && echo  Frontend starting on http://localhost:5173 && npm run dev"
) else (
    echo  [SKIP] web-frontend/package.json not found - skipping frontend.
)

:: ---------------------------------------------------------------
:: Done
:: ---------------------------------------------------------------
echo.
echo ============================================================
echo  All services are starting in separate windows:
echo.
echo    MySQL Server        localhost:3306
echo    Auth Service        http://localhost:8081
echo    Booking Service     http://localhost:8082
echo    Room Service        http://localhost:8083
echo    Analytics Service   http://localhost:8084
echo    Web Frontend        http://localhost:5173
echo.
echo  Databases: hotel_auth, hotel_booking, hotel_room
echo  DB User:   hotel / hotel
echo.
echo  Close this window at any time.
echo  To stop everything, close all the service windows.
echo ============================================================
echo.
pause
