@echo off
echo Creating backup...
set timestamp=%date:~-4%-%date:~4,2%-%date:~7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set timestamp=%timestamp: =0%
mkdir "backups\coding-platform_%timestamp%"
xcopy /E /I /H "frontend" "backups\coding-platform_%timestamp%\frontend"
copy "script.js" "backups\coding-platform_%timestamp%\"
echo Backup created: backups\coding-platform_%timestamp%
pause
