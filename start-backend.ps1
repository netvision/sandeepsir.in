# Sandeep Sir Classes - Backend Startup Script

Write-Host "========================================"
Write-Host "Sandeep Sir Classes - Starting Backend"
Write-Host "========================================"
Write-Host ""

Set-Location backend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..."
    npm install
}

if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from .env.example..."
    Copy-Item .env.example .env
    Write-Host ""
    Write-Host "Please update backend\.env with your MongoDB connection string and JWT secret!" -ForegroundColor Yellow
    Write-Host ""
    pause
}

Write-Host "Starting backend server..." -ForegroundColor Green
npm run dev
