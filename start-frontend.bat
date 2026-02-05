@echo off
echo ========================================
echo Sandeep Sir Classes - Starting Frontend
echo ========================================
echo.

cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

echo Starting frontend server...
call npm run dev
