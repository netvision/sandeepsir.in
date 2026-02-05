# Quick Start Guide - Sandeep Sir Classes

## Prerequisites
- Node.js v16+ installed
- MongoDB installed and running
- Git (optional)

## Step-by-Step Setup

### 1. Install MongoDB (if not installed)
```powershell
# Download from: https://www.mongodb.com/try/download/community
# Or use Chocolatey:
choco install mongodb
```

### 2. Start MongoDB
```powershell
# Start MongoDB service
net start MongoDB
```

### 3. Setup Backend

Open PowerShell and navigate to the project:
```powershell
cd d:\dev\sandeepsir\backend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Start backend server
npm run dev
```

Backend should now be running on http://localhost:5000

### 4. Setup Frontend

Open a NEW PowerShell window:
```powershell
cd d:\dev\sandeepsir\frontend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Start frontend server
npm run dev
```

Frontend should now be running on http://localhost:3000

### 5. Create Admin Account

Open a THIRD PowerShell window and run:
```powershell
# Create first admin user
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Admin",
    "email": "admin@sandeepsir.in",
    "password": "admin123",
    "role": "admin"
  }'
```

### 6. Login to Admin Panel

1. Open browser: http://localhost:3000/login
2. Login with:
   - Email: admin@sandeepsir.in
   - Password: admin123

### 7. Initial Setup

Once logged in:

1. **Add Classes** (Go to Admin > Classes)
   - Click "Add New Class"
   - Add: Class 9, Class 10, Class 11, Class 12

2. **Add Subjects** (Go to Admin > Subjects)
   - Mathematics (गणित)
   - Science (विज्ञान)
   - English (अंग्रेजी)
   - Hindi (हिंदी)
   - Social Science (सामाजिक विज्ञान)
   - etc.

3. **Upload Materials** (Go to Admin > Upload Material)
   - Select class and subject
   - Choose file type
   - Upload PDF/video/mindmap

## Accessing the Website

- **Public Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

## Common Commands

### Backend
```powershell
cd backend
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend
```powershell
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running: `net start MongoDB`
- Check connection string in `backend/.env`

### "Port 3000/5000 already in use"
- Stop other applications using these ports
- Or change port in configuration files

### "Module not found" errors
- Run `npm install` in both backend and frontend directories

### File upload not working
- Check if `backend/uploads` directory exists
- Verify file size (max 100MB)

## Next Steps

1. Copy founder photo (`sandeepsir.jpeg`) to `frontend/public/`
2. Customize content in About Us page
3. Add your materials through admin panel
4. Share website with students

## Support

For issues, check:
- Backend logs in terminal
- Frontend console (F12 in browser)
- MongoDB logs

---

You're all set! Start uploading materials and helping students. 🎓
