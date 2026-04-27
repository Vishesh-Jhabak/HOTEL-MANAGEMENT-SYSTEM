netstat -ano | findstr " :3306 " | findstr " "LISTENING >nul 2>&1  
if %0% equ 0 ( echo yes ) else ( echo no )  
