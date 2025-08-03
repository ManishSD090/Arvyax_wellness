# Arvyax Wellness - Setup Guide

This guide will help you set up and connect the frontend and backend for the Arvyax Wellness application.

## 🚀 Quick Start

### 1. Backend Setup

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

#### Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/arvyax-wellness

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

#### Install Dependencies
```bash
cd backend
npm install
```

#### Start Backend Server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup

#### Environment Configuration
Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Optional: Development settings
VITE_DEBUG_MODE=true
VITE_ENABLE_MOCK_DATA=false
```

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Sessions
- `GET /api/sessions` - Get all published sessions
- `GET /api/sessions/my/sessions` - Get user's sessions (protected)
- `GET /api/sessions/:id` - Get specific session
- `POST /api/sessions` - Create new session (protected)
- `PUT /api/sessions/:id` - Update session (protected)
- `DELETE /api/sessions/:id` - Delete session (protected)
- `PATCH /api/sessions/:id/publish` - Publish session (protected)
- `POST /api/sessions/:id/like` - Like/unlike session (protected)
- `POST /api/sessions/:id/bookmark` - Bookmark/unbookmark session (protected)

### Search & Filter
- `GET /api/sessions/search` - Search sessions
- `GET /api/sessions/categories` - Get categories
- `GET /api/sessions/levels` - Get difficulty levels

## 📊 Database Schema

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

## 🛠️ Development Features

### Backend Features
- ✅ **JWT Authentication** with secure token management
- ✅ **MongoDB Integration** with Mongoose ODM
- ✅ **Password Hashing** with bcryptjs
- ✅ **CORS Support** for cross-origin requests
- ✅ **Error Handling** with proper HTTP status codes
- ✅ **Input Validation** and sanitization
- ✅ **Search Functionality** with text indexing
- ✅ **Pagination** for large datasets
- ✅ **File Upload Support** (ready for implementation)

### Frontend Features
- ✅ **Real-time API Integration** with fallback data
- ✅ **Authentication Guards** for protected routes
- ✅ **Token Management** with automatic refresh
- ✅ **Error Handling** with user-friendly messages
- ✅ **Loading States** and skeleton loaders
- ✅ **Responsive Design** for all devices
- ✅ **Search & Filter** functionality
- ✅ **Interactive Features** (like, bookmark, publish)

## 🧪 Testing the Connection

### 1. Test Backend
```bash
# Test if backend is running
curl http://localhost:5000
# Should return: "🌿 Arvyax backend up and running"
```

### 2. Test Frontend
```bash
# Open browser to
http://localhost:5173
# Should show the landing page
```

### 3. Test API Endpoints
```bash
# Test categories endpoint
curl http://localhost:5000/api/sessions/categories

# Test levels endpoint
curl http://localhost:5000/api/sessions/levels
```

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

## 📝 API Documentation

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt-token> (for protected routes)
```

### Response Format
```javascript
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

### Error Response Format
```javascript
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 