# Sandeep Sir Classes - Educational Portal

A complete web portal for providing free study materials and mind maps to students of class 9 to 12.

## 🌟 Features

- **Public Website**
  - Browse study materials by class and subject
  - Download PDFs, videos, and mind maps
  - Beautiful bilingual interface (English & Hindi)
  - Responsive design for all devices

- **Admin Panel**
  - Upload study materials with thumbnails
  - Manage classes and subjects
  - Track views and downloads
  - User authentication with JWT

## 🛠️ Technology Stack

### Frontend
- Vue 3 (Composition API)
- Vue Router 4
- Pinia (State Management)
- Vite (Build Tool)
- Axios (HTTP Client)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Multer (File Upload)

## 📁 Project Structure

```
sandeepsir/
├── backend/                # Node.js/Express backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # Uploaded files (created automatically)
│   ├── server.js          # Entry point
│   └── package.json
├── frontend/              # Vue.js frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── layouts/      # Layout components
│   │   ├── stores/       # Pinia stores
│   │   ├── services/     # API services
│   │   ├── router/       # Vue Router
│   │   └── main.js       # Entry point
│   ├── index.html
│   └── package.json
├── sandeepsir.jpeg        # Founder photo
└── About Us.txt           # About content
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```powershell
   cd backend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```powershell
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sandeepsir
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

5. Make sure MongoDB is running

6. Start the backend server:
   ```powershell
   npm run dev
   ```

   Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
   ```powershell
   cd frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create `.env` file:
   ```powershell
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

4. Start the development server:
   ```powershell
   npm run dev
   ```

   Frontend will run on http://localhost:3000

## 👤 Admin Access

### Creating the First Admin User

After starting the backend, you can create an admin user by making a POST request:

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

Or use a tool like Postman/Thunder Client to send a POST request to:
- **URL**: `http://localhost:5000/api/auth/register`
- **Body** (JSON):
  ```json
  {
    "name": "Admin",
    "email": "admin@sandeepsir.in",
    "password": "admin123",
    "role": "admin"
  }
  ```

Then login at: http://localhost:3000/login

## 📊 Initial Data Setup

### Adding Classes

Use the admin panel to add classes (9, 10, 11, 12) or use the API:

```powershell
# After login, use the token in Authorization header
curl -X POST http://localhost:5000/api/classes `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_TOKEN_HERE" `
  -d '{
    "name": "Class 9",
    "classNumber": 9,
    "description": "Class 9 Study Materials"
  }'
```

### Adding Subjects

Add subjects like Mathematics, Science, English, Hindi, etc. through the admin panel or API.

## 🎯 Usage

### Public Website
1. Visit http://localhost:3000
2. Browse materials by class
3. Filter by subject and type
4. View and download materials

### Admin Panel
1. Login at http://localhost:3000/login
2. Access dashboard at http://localhost:3000/admin
3. Upload materials with the upload form
4. Manage classes and subjects
5. View statistics and recent uploads

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

### Materials
- `GET /api/materials` - Get all materials (with filters)
- `GET /api/materials/:id` - Get single material
- `POST /api/materials` - Upload material (auth required)
- `PUT /api/materials/:id` - Update material (auth required)
- `DELETE /api/materials/:id` - Delete material (admin only)

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class (admin only)
- `PUT /api/classes/:id` - Update class (admin only)
- `DELETE /api/classes/:id` - Delete class (admin only)

### Subjects
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create subject (admin only)
- `PUT /api/subjects/:id` - Update subject (admin only)
- `DELETE /api/subjects/:id` - Delete subject (admin only)

## 🎨 Customization

### Adding Custom Styles
- Edit `frontend/src/style.css` for global styles
- Modify CSS variables in `:root` for theme colors

### Changing Content
- Update about page content in `About Us.txt`
- Replace `sandeepsir.jpeg` with founder's photo

## 🔒 Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation
- File upload restrictions (type and size)
- CORS enabled for frontend origin

## 📦 Building for Production

### Frontend
```powershell
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
```powershell
cd backend
npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file

### Port Already in Use
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

### File Upload Issues
- Check file size limits (max 100MB)
- Ensure uploads directory exists
- Verify file types are allowed

## 📄 License

MIT License - Free to use for educational purposes

## 👨‍🏫 About

Created for **Dr. Sandeep Sharma** (Shiksha Shri, Sahitya Ratna, Sahitya Shri)
- M.A. (Gold Medalist)
- B.Ed. (Gold Medalist)
- Ph.D. (Delhi University)
- EX. SCINDIA

**Mission**: To eradicate the educational divide by providing free academic resources to students in need.

---

For questions or support, please contact through the website.
