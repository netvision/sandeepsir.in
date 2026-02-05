# 🎓 Sandeep Sir Classes - Complete Website & Admin Panel

## ✅ Project Complete!

A full-featured educational portal with Vue.js frontend and Node.js/Express backend has been created for **sandeepsir.in**.

---

## 📋 What Has Been Built

### 🌐 Public Website (Vue.js)
- **Home Page**: Welcome section with class selection
- **Materials Page**: Browse and filter study materials
- **Material Detail Page**: View and download individual materials
- **Class Materials Page**: Materials organized by class and subject
- **About Us Page**: Information about Dr. Sandeep Sharma and mission
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Bilingual Interface**: English and Hindi support

### 🔐 Admin Panel
- **Dashboard**: Statistics and recent uploads overview
- **Material Management**: View, edit, delete, activate/deactivate materials
- **Upload Material**: Form to upload new study materials with thumbnails
- **Class Management**: Add, edit, delete classes (9-12)
- **Subject Management**: Add, edit, delete subjects
- **Authentication**: Secure login with JWT tokens
- **User-Friendly Interface**: Clean and modern design

### ⚙️ Backend API (Node.js/Express)
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based secure authentication
- **File Upload**: Multer-based file handling (up to 100MB)
- **Database**: MongoDB with Mongoose ODM
- **Models**: User, Material, Class, Subject
- **Security**: Password hashing, input validation, CORS
- **Middleware**: Auth, file upload, error handling

---

## 📁 Project Structure

```
sandeepsir/
├── backend/                      # Node.js/Express Backend
│   ├── models/                   # MongoDB Models
│   │   ├── User.js
│   │   ├── Material.js
│   │   ├── Class.js
│   │   └── Subject.js
│   ├── routes/                   # API Routes
│   │   ├── auth.routes.js
│   │   ├── material.routes.js
│   │   ├── class.routes.js
│   │   └── subject.routes.js
│   ├── middleware/               # Custom Middleware
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── uploads/                  # File Storage (auto-created)
│   ├── server.js                 # Entry Point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/                     # Vue.js Frontend
│   ├── public/
│   │   └── sandeepsir.jpeg      # Founder Photo
│   ├── src/
│   │   ├── pages/               # Page Components
│   │   │   ├── Home.vue
│   │   │   ├── About.vue
│   │   │   ├── Materials.vue
│   │   │   ├── MaterialDetail.vue
│   │   │   ├── ClassMaterials.vue
│   │   │   ├── Login.vue
│   │   │   └── admin/
│   │   │       ├── Dashboard.vue
│   │   │       ├── Materials.vue
│   │   │       ├── Upload.vue
│   │   │       ├── Classes.vue
│   │   │       └── Subjects.vue
│   │   ├── layouts/             # Layout Components
│   │   │   ├── MainLayout.vue
│   │   │   └── AdminLayout.vue
│   │   ├── stores/              # Pinia State Management
│   │   │   ├── auth.js
│   │   │   └── material.js
│   │   ├── services/            # API Services
│   │   │   ├── api.js
│   │   │   └── index.js
│   │   ├── router/              # Vue Router
│   │   │   └── index.js
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── sandeepsir.jpeg              # Founder Photo (Original)
├── About Us.txt                 # Content File
│
├── README.md                    # Main Documentation
├── INSTALL.md                   # Installation Guide
├── QUICKSTART.md                # Quick Start Guide
├── SETUP_CHECKLIST.md           # Setup Checklist
│
├── start-backend.bat            # Windows Batch Script
├── start-frontend.bat           # Windows Batch Script
├── start-backend.ps1            # PowerShell Script
└── start-frontend.ps1           # PowerShell Script
```

---

## 🚀 Quick Start

### Option 1: Using Scripts (Windows)

1. **Start Backend**: Double-click `start-backend.bat`
2. **Start Frontend**: Double-click `start-frontend.bat`

### Option 2: Manual Start

```powershell
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### Create Admin Account

```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Admin",
    "email": "admin@sandeepsir.in",
    "password": "admin123",
    "role": "admin"
  }'
```

### Access Website

- **Public Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

---

## 🎨 Features

### For Students
✅ Browse materials by class (9-12)
✅ Filter by subject and type
✅ Search functionality
✅ Download PDFs, videos, mind maps
✅ View material details
✅ Track views and downloads
✅ Mobile-friendly design
✅ Bilingual interface (English/Hindi)

### For Admin
✅ Secure authentication
✅ Upload materials with thumbnails
✅ Manage classes and subjects
✅ View statistics
✅ Activate/deactivate materials
✅ Delete materials
✅ Track engagement metrics
✅ Clean dashboard interface

---

## 🔧 Technology Stack

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **Vue Router 4** - Official router
- **Pinia** - State management
- **Vite** - Build tool
- **Axios** - HTTP client
- **Vue Toastification** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Helmet** - Security headers
- **Morgan** - Logging

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Upload material (auth)
- `PUT /api/materials/:id` - Update material (auth)
- `DELETE /api/materials/:id` - Delete material (admin)
- `POST /api/materials/:id/download` - Track download

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create class (admin)
- `PUT /api/classes/:id` - Update class (admin)
- `DELETE /api/classes/:id` - Delete class (admin)

### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/:id` - Get subject by ID
- `POST /api/subjects` - Create subject (admin)
- `PUT /api/subjects/:id` - Update subject (admin)
- `DELETE /api/subjects/:id` - Delete subject (admin)

---

## 📚 Documentation

1. **README.md** - Complete project documentation
2. **INSTALL.md** - Detailed installation instructions
3. **QUICKSTART.md** - Quick setup guide
4. **SETUP_CHECKLIST.md** - Pre-launch checklist

---

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation
- File type and size restrictions
- CORS configuration
- Helmet security headers
- Protected admin routes
- Token expiration handling

---

## 📱 Responsive Design

- Desktop optimized (1200px+)
- Tablet friendly (768px-1199px)
- Mobile compatible (320px-767px)
- Touch-friendly interface
- Optimized images
- Fast loading times

---

## 🎯 Next Steps

### Before Launch
1. ✅ Review and test all features
2. ✅ Add initial classes (9, 10, 11, 12)
3. ✅ Add subjects for each class
4. ✅ Upload first batch of materials
5. ✅ Test on different devices
6. ✅ Change JWT secret in production
7. ✅ Setup production MongoDB
8. ✅ Configure domain name
9. ✅ Setup SSL certificate
10. ✅ Deploy to production server

### Growth Features (Optional)
- Email notifications
- Advanced search
- User comments/feedback
- Material ratings
- Video player integration
- PDF viewer in browser
- Download statistics
- Analytics dashboard
- Multiple language support
- Mobile app

---

## 🌟 About The Project

**Mission**: To eradicate the educational divide by providing free academic resources to students who possess ambition but lack material means.

**Vision**: To foster a global renaissance where merit is the sole currency of success.

**Founder**: Dr. Sandeep Sharma
- Shiksha Shri, Sahitya Ratna, Sahitya Shri
- M.A. (Gold Medalist)
- B.Ed. (Gold Medalist)
- Ph.D. (Delhi University)
- EX. SCINDIA

---

## 📞 Support

For technical issues:
1. Check terminal/console logs
2. Review browser developer tools (F12)
3. Verify MongoDB is running
4. Check environment variables
5. Review documentation files

---

## 📄 License

MIT License - Free to use for educational purposes

---

## ✨ Acknowledgments

Built with ❤️ for students who dream of a better future through education.

**"निर्धनता शिक्षा के मार्ग में बाधा नहीं बनती"**
*"Poverty should not be a barrier to education"*

---

**Project Status**: ✅ Complete and Ready to Deploy

**Last Updated**: January 26, 2026

---

## 🚀 Start Now!

1. Follow INSTALL.md for setup
2. Use QUICKSTART.md for rapid deployment
3. Check SETUP_CHECKLIST.md before going live

**Happy Teaching! 🎓**
