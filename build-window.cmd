@echo off
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker chua chay! Vui long mo Docker Desktop.
    pause
    exit /b
)

docker-compose -f docker-compose-window.yml up --build
pause
