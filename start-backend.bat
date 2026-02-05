@echo off
echo ========================================
echo Sandeep Sir Classes - Starting Backend
echo ========================================
echo.

cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo.
    echo Please update backend\.env with your MongoDB connection string and JWT secret!
    echo.
    pause
)

echo Starting backend server...
call npm run dev
