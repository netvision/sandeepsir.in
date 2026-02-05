# Sandeep Sir Classes - Frontend Startup Script

Write-Host "========================================"
Write-Host "Sandeep Sir Classes - Starting Frontend"
Write-Host "========================================"
Write-Host ""

Set-Location frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..."
    npm install
}

if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from .env.example..."
    Copy-Item .env.example .env
}

Write-Host "Starting frontend server..." -ForegroundColor Green
npm run dev
