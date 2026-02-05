# Complete Installation Guide - Sandeep Sir Classes

This guide will walk you through setting up the entire Sandeep Sir Classes educational portal from scratch.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installing Prerequisites](#installing-prerequisites)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Initial Configuration](#initial-configuration)
6. [Troubleshooting](#troubleshooting)

---

## System Requirements

- **Operating System**: Windows 10/11, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **Internet Connection**: Required for downloading dependencies

---

## Installing Prerequisites

### 1. Install Node.js

Node.js is required to run both frontend and backend.

**Windows:**
1. Download from: https://nodejs.org/ (LTS version recommended)
2. Run the installer
3. Follow installation wizard (keep default settings)
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install MongoDB

MongoDB is the database for storing all data.

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer and select "Complete" installation
3. Install as a Windows Service (recommended)
4. Start MongoDB:
   ```powershell
   net start MongoDB
   ```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify MongoDB is running:
```bash
mongosh --version
```

### 3. Install Git (Optional but Recommended)

**Windows:**
- Download from: https://git-scm.com/download/win

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

---

## Project Setup

### Method 1: Using Startup Scripts (Easiest for Windows)

1. **Start Backend**
   - Double-click `start-backend.bat` or right-click and "Run with PowerShell"
   - Wait for "Server running on port 5000" message

2. **Start Frontend** (in a new terminal)
   - Double-click `start-frontend.bat` or right-click and "Run with PowerShell"
   - Wait for "Local: http://localhost:3000" message

### Method 2: Manual Setup (All Platforms)

#### Backend Setup

1. Open terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd d:\dev\sandeepsir\backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

5. Edit `.env` file and update these values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sandeepsir
   JWT_SECRET=your_very_secure_random_string_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

   **Important**: Change `JWT_SECRET` to a random secure string!

6. Start backend server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✅ Connected to MongoDB
   🚀 Server running on port 5000
   ```

#### Frontend Setup

1. Open a NEW terminal window
2. Navigate to frontend folder:
   ```bash
   cd d:\dev\sandeepsir\frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

5. Start frontend server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE ready in XXX ms
   ➜  Local:   http://localhost:3000/
   ```

---

## Initial Configuration

### 1. Create Admin Account

Open a THIRD terminal and run:

**Windows PowerShell:**
```powershell
$body = @{
    name = "Admin"
    email = "admin@sandeepsir.in"
    password = "Admin@123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**macOS/Linux (curl):**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@sandeepsir.in",
    "password": "Admin@123",
    "role": "admin"
  }'
```

You should see a success response with a token.

### 2. Login to Admin Panel

1. Open browser: http://localhost:3000/login
2. Enter credentials:
   - **Email**: admin@sandeepsir.in
   - **Password**: Admin@123
3. Click "Login"

### 3. Add Initial Data

#### Add Classes:
1. Go to **Admin > Classes**
2. Click "Add New Class"
3. Add these classes:
   - Class 9 (classNumber: 9)
   - Class 10 (classNumber: 10)
   - Class 11 (classNumber: 11)
   - Class 12 (classNumber: 12)

#### Add Subjects:
1. Go to **Admin > Subjects**
2. Click "Add New Subject"
3. Add subjects like:
   - Mathematics (गणित) - Code: MATH
   - Science (विज्ञान) - Code: SCI
   - English (अंग्रेजी) - Code: ENG
   - Hindi (हिंदी) - Code: HIN
   - Social Science (सामाजिक विज्ञान) - Code: SST
   - Select applicable classes for each subject

#### Upload Materials:
1. Go to **Admin > Upload Material**
2. Fill in the form:
   - Title
   - Description
   - Select Class
   - Select Subject
   - Select Type (PDF, Video, Mind Map, etc.)
   - Upload file (max 100MB)
   - Optional: Upload thumbnail
3. Click "Upload Material"

---

## Accessing the Website

After successful setup:

- **Public Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000/api

---

## Troubleshooting

### MongoDB Connection Failed

**Problem**: Cannot connect to MongoDB

**Solutions**:
1. Check if MongoDB is running:
   ```powershell
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Verify connection string in `backend/.env`
3. Check MongoDB logs for errors

### Port Already in Use

**Problem**: EADDRINUSE error

**Solutions**:
1. **Find and kill process using the port:**
   ```powershell
   # Windows - Find process on port 5000
   netstat -ano | findstr :5000
   # Kill process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

2. **Or change the port:**
   - Backend: Edit `backend/.env` and change `PORT`
   - Frontend: Edit `frontend/vite.config.js`

### Module Not Found

**Problem**: Cannot find module errors

**Solution**: Delete node_modules and reinstall
```bash
# In backend or frontend folder
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### File Upload Not Working

**Problem**: Cannot upload files

**Solutions**:
1. Check file size (max 100MB)
2. Verify file type is allowed
3. Check if `backend/uploads` folder exists:
   ```bash
   cd backend
   mkdir -p uploads/materials uploads/thumbnails uploads/mindmaps
   ```

### Frontend Not Loading

**Problem**: Blank page or errors in console

**Solutions**:
1. Clear browser cache
2. Check browser console (F12) for errors
3. Verify backend is running
4. Check `.env` file has correct API URL

### Login Not Working

**Problem**: Cannot login to admin panel

**Solutions**:
1. Verify admin user was created successfully
2. Check credentials are correct
3. Check backend logs for errors
4. Verify JWT_SECRET is set in backend/.env

---

## Production Deployment

For production deployment:

1. Update environment variables for production
2. Build frontend: `npm run build` in frontend folder
3. Setup production MongoDB (MongoDB Atlas recommended)
4. Deploy backend to cloud platform (Heroku, DigitalOcean, AWS)
5. Deploy frontend (Netlify, Vercel, or with backend)
6. Configure domain and SSL certificate

See detailed deployment guide in documentation.

---

## Getting Help

If you encounter issues:

1. Check the logs in terminal windows
2. Review browser console (F12)
3. Check MongoDB is running and accessible
4. Verify all environment variables are set correctly
5. Ensure all dependencies are installed

---

## Next Steps

1. ✅ Create admin account
2. ✅ Add classes and subjects
3. ✅ Upload first materials
4. 📚 Share website with students
5. 📊 Monitor usage through admin dashboard

**Congratulations!** Your educational portal is now ready to use. 🎓

---

**Need Help?** Check README.md and QUICKSTART.md for more information.
