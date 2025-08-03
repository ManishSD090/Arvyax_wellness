# 🌿 Arvyax Wellness Platform

A comprehensive wellness platform for creating, managing, and discovering wellness sessions. Built with React frontend and Node.js backend with MongoDB.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Run the automated setup script
node setup.js
```

### Option 2: Manual Setup

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

#### 1. Backend Setup
```bash
cd backend

# Create .env file
echo "MONGO_URI=mongodb://localhost:27017/arvyax-wellness
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development" > .env

# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

#### 2. Frontend Setup
```bash
cd frontend

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEBUG_MODE=true" > .env

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Features

### ✅ Backend Features
- **JWT Authentication** with secure token management
- **MongoDB Integration** with Mongoose ODM
- **Password Hashing** with bcryptjs
- **CORS Support** for cross-origin requests
- **Error Handling** with proper HTTP status codes
- **Input Validation** and sanitization
- **Search Functionality** with text indexing
- **Pagination** for large datasets
- **File Upload Support** (ready for implementation)

### ✅ Frontend Features
- **Real-time API Integration** with fallback data
- **Authentication Guards** for protected routes
- **Token Management** with automatic refresh
- **Error Handling** with user-friendly messages
- **Loading States** and skeleton loaders
- **Responsive Design** for all devices
- **Search & Filter** functionality
- **Interactive Features** (like, bookmark, publish)
- **Session Creation** with comprehensive form
- **Draft Management** system

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Sessions
- `GET /api/sessions` - Get all published sessions (returns all sessions by default)
- `GET /api/sessions/my/sessions` - Get user's sessions (protected)
- `GET /api/sessions/:id` - Get specific session
- `POST /api/sessions` - Create new session (protected)
- `PUT /api/sessions/:id` - Update session (protected)
- `DELETE /api/sessions/:id` - Delete session (protected)
- `PATCH /api/sessions/:id/publish` - Publish session (protected)
- `POST /api/sessions/:id/like` - Like/unlike session (protected)
- `POST /api/sessions/:id/bookmark` - Bookmark/unbookmark session (protected)

### Search & Filter
- `GET /api/sessions/search` - Search sessions (returns all matching sessions by default)
- `GET /api/sessions/categories` - Get categories
- `GET /api/sessions/levels` - Get levels

## 🗄️ Database Initialization

The application automatically initializes the database with all wellness sessions when the backend starts. This ensures that:

- ✅ **All sessions are available for every new login**
- ✅ **No manual seeding required**
- ✅ **Consistent experience for all users**
- ✅ **Automatic admin user creation**

The initialization process:
1. Creates an admin user (`admin@arvyax.com` / `admin123`) if it doesn't exist
2. Seeds the database with 25+ wellness sessions if none exist
3. Ensures all sessions are marked as "published" and ready for use
- `GET /api/sessions/levels` - Get difficulty levels

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required),
  email: String (required, unique),
  number: String (required),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Session Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String (required, enum),
  level: String (required, enum),
  duration: String (required),
  image: String (required),
  tags: [String],
  status: String (enum: 'draft', 'published'),
  creator: ObjectId (ref: User),
  likes: [ObjectId] (ref: User),
  bookmarks: [ObjectId] (ref: User),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication Flow

1. **Registration**: User creates account with username, email, number, password
2. **Login**: User provides email and password
3. **Token**: JWT token is returned and stored in localStorage
4. **Protected Routes**: Token is automatically attached to API requests
5. **Token Expiry**: Automatic logout when token expires (7 days)

## 🧪 Testing

### Test Credentials
```
Email: test@example.com
Password: password123
```

### Test the Application
1. Start both backend and frontend servers
2. Open http://localhost:5173
3. Login with test credentials
4. Explore the dashboard and create sessions
5. Test the My Sessions page with drafts and published content

## 🔍 Troubleshooting

### Common Issues

#### Backend Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **JWT Secret Error**
   - Generate a new JWT_SECRET
   - Ensure it's at least 32 characters long

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process on port 5000

#### Frontend Issues
1. **API Connection Error**
   - Check VITE_API_BASE_URL in .env
   - Ensure backend is running
   - Check CORS configuration

2. **Authentication Issues**
   - Clear localStorage
   - Check token expiration
   - Verify JWT_SECRET matches backend

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

### Debug Mode
Enable debug mode in frontend `.env`:
```env
VITE_DEBUG_MODE=true
```

This will show detailed API request/response logs in the browser console.

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use environment variables for sensitive data
3. Set up MongoDB Atlas or production database
4. Configure CORS for production domain
5. Set up SSL/TLS certificates

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Set production environment variables
4. Configure custom domain

## 📁 Project Structure

```
arvyax-wellness/
├── backend/
│   ├── controllers/
│   │   ├── authcontroller.js
│   │   └── sessionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Session.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── sessionRoutes.js
│   ├── index.js
│   ├── seedData.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MySessions.jsx
│   │   │   ├── CreateSession.jsx
│   │   │   ├── Schedule.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   └── Account_Signing.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── setup.js
├── SETUP.md
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Ensure all dependencies are installed
3. Verify MongoDB is running
4. Check the browser console for errors
5. Verify environment variables are set correctly

For additional help, please open an issue on the repository. 