# Setup Checklist for Sandeep Sir Classes

## Initial Setup ✓

### Backend
- [x] Create backend folder structure
- [x] Setup Express server
- [x] Configure MongoDB connection
- [x] Create models (User, Material, Class, Subject)
- [x] Setup authentication middleware
- [x] Create API routes
- [x] Configure file upload

### Frontend
- [x] Create Vue 3 project
- [x] Setup Vue Router
- [x] Configure Pinia stores
- [x] Create main layout
- [x] Create admin layout
- [x] Setup API service layer

## TODO Before Going Live

### Content
- [ ] Copy `sandeepsir.jpeg` to `frontend/public/` folder
- [ ] Review and update About Us content
- [ ] Add initial classes (9, 10, 11, 12)
- [ ] Add initial subjects
- [ ] Upload first batch of materials

### Security
- [ ] Change JWT_SECRET in backend/.env to a strong random string
- [ ] Create strong admin password
- [ ] Review file upload restrictions
- [ ] Add rate limiting for API endpoints
- [ ] Configure CORS for production domain

### Database
- [ ] Setup MongoDB indexes for better performance
- [ ] Configure MongoDB backup strategy
- [ ] Add data validation rules

### Deployment
- [ ] Choose hosting provider (Heroku, DigitalOcean, AWS, etc.)
- [ ] Setup production environment variables
- [ ] Configure domain name
- [ ] Setup SSL certificate
- [ ] Build frontend for production
- [ ] Deploy backend to server
- [ ] Deploy frontend (static hosting or with Node)
- [ ] Configure file storage (local or cloud like AWS S3)

### Testing
- [ ] Test all user flows
- [ ] Test file uploads with different types
- [ ] Test mobile responsiveness
- [ ] Test on different browsers
- [ ] Load testing for multiple users
- [ ] Test admin functionalities

### Optional Enhancements
- [ ] Add email notifications
- [ ] Add search functionality
- [ ] Add material categories/tags
- [ ] Add user feedback/comments
- [ ] Add analytics/statistics
- [ ] Add material recommendations
- [ ] Add PDF viewer in browser
- [ ] Add video player
- [ ] Multi-language support
- [ ] Add contact form

### Documentation
- [x] Create README.md
- [x] Create QUICKSTART.md
- [ ] Create API documentation
- [ ] Create admin user guide
- [ ] Create deployment guide

## Quick Commands

### First Time Setup
```powershell
# Backend
cd backend
npm install
Copy-Item .env.example .env
# Edit .env file with your settings
npm run dev

# Frontend (new terminal)
cd frontend
npm install
Copy-Item .env.example .env
npm run dev

# Create admin user (new terminal)
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Admin","email":"admin@sandeepsir.in","password":"admin123","role":"admin"}'
```

### Daily Development
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Adding Data via API

#### Add a Class
```powershell
curl -X POST http://localhost:5000/api/classes `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -d '{"name":"Class 9","classNumber":9}'
```

#### Add a Subject
```powershell
curl -X POST http://localhost:5000/api/subjects `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -d '{"name":"Mathematics","nameHindi":"गणित","code":"MATH"}'
```

## Notes

- All passwords are hashed using bcrypt
- File uploads are limited to 100MB
- Supported file types: PDF, DOC, DOCX, MP4, AVI, images
- MongoDB runs on default port 27017
- Backend API runs on port 5000
- Frontend dev server runs on port 3000

## Important Files

- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend configuration
- `backend/server.js` - Backend entry point
- `frontend/src/main.js` - Frontend entry point
- `backend/models/` - Database schemas
- `frontend/src/pages/` - All page components

---

Last Updated: January 26, 2026
