@echo off
echo Starting JAVA HOTEL MANAGEMENT SYSTEM...

REM Check if Maven is installed
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo Maven is not installed. Please install Maven first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Build the project first
echo Building the project...
mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo Build failed. Please check the errors above.
    pause
    exit /b 1
)

echo Build successful! Starting services...

REM Create logs directory
if not exist logs mkdir logs

REM Start backend services
echo Starting backend services...
echo Starting Auth Service on port 8081...
start "Auth Service" cmd /k "mvn spring-boot:run -pl auth-service"

echo Starting Booking Service on port 8082...
start "Booking Service" cmd /k "mvn spring-boot:run -pl booking-service"

echo Starting Room Service on port 8083...
start "Room Service" cmd /k "mvn spring-boot:run -pl room-service"

echo Starting Analytics Service on port 8084...
start "Analytics Service" cmd /k "mvn spring-boot:run -pl analytics-service"

REM Wait for services to start
echo Waiting for backend services to start...
timeout /t 30 /nobreak

REM Start frontend
echo Starting frontend...
cd web-frontend

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)

echo Starting React development server...
start "Frontend" cmd /k "npm run dev"

cd ..

echo.
echo All services started successfully!
echo.
echo Access Points:
echo   Web Interface: http://localhost:5173
echo   API Documentation:
echo     - Auth Service: http://localhost:8081/swagger-ui/index.html
echo     - Booking Service: http://localhost:8082/swagger-ui/index.html
echo     - Room Service: http://localhost:8083/swagger-ui/index.html
echo     - Analytics Service: http://localhost:8084/swagger-ui/index.html
echo.
echo Demo Login Credentials:
echo   Admin: admin1 / password
echo   Manager: mgr1 / password
echo   Reception: rec1 / password
echo   Housekeeping: hk1 / password
echo   Guest: guest1 / password
echo.
echo To stop services, close the individual command windows or run stop-all.bat
pause
