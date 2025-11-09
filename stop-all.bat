@echo off
echo Stopping JAVA HOTEL MANAGEMENT SYSTEM...

REM Kill Java processes (Spring Boot services)
echo Stopping backend services...
taskkill /f /im java.exe 2>nul

REM Kill Node.js processes (React dev server)
echo Stopping frontend service...
taskkill /f /im node.exe 2>nul

REM Kill processes on specific ports using netstat and taskkill
echo Killing processes on ports 8081-8084 and 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8082') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8083') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8084') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /f /pid %%a 2>nul

echo All services stopped successfully!
echo You can now run start-all.bat to start the system again.
pause
