# Arvyax Wellness Frontend

A modern, dynamic wellness platform built with React, Vite, and Tailwind CSS.

## 🚀 Dynamic Features Implemented

### Dashboard Page (`/Dashboard`)
- **Real-time Data Fetching**: Integrates with backend API to fetch live session data
- **Advanced Search & Filtering**: 
  - Search by title, description, or category
  - Filter by category and difficulty level
  - Clear filters functionality
- **Interactive Session Cards**:
  - Like/unlike sessions with real-time updates
  - Bookmark sessions for later viewing
  - View session details
  - Loading states for all interactions
- **Smart Sorting**: Sort by most recent, most popular, or duration
- **Responsive Design**: Grid and list view modes
- **Authentication Integration**: Automatic redirect to login if not authenticated
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Smooth loading animations and spinners

### My Sessions Page (`/MySessions`)
- **Session Management**: 
  - View drafts and published sessions
  - Publish drafts with one click
  - Edit existing sessions
  - Delete sessions with confirmation modal
- **Real-time Updates**: Session status changes reflect immediately
- **Advanced Filtering**: Filter by status (draft/published)
- **Success Notifications**: Toast notifications for successful actions
- **Confirmation Dialogs**: Safe deletion with confirmation modals
- **Empty States**: Helpful empty state messages with call-to-action buttons

### API Integration
- **Comprehensive API Layer**: Full CRUD operations for sessions
- **Authentication**: JWT token management with automatic logout
- **Error Handling**: Centralized error handling with user-friendly messages
- **Request/Response Interceptors**: Automatic token attachment and error handling

## 🛠️ Technical Features

### State Management
- React hooks for local state management
- Real-time data synchronization
- Optimistic updates for better UX

### User Experience
- **Loading States**: Spinners and skeleton loaders
- **Error States**: User-friendly error messages with retry options
- **Success Feedback**: Toast notifications for successful actions
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Smooth Animations**: CSS transitions and micro-interactions

### Security
- **Authentication Guards**: Protected routes with automatic redirects
- **Token Management**: Secure token storage and automatic refresh
- **Input Validation**: Client-side validation with error feedback

## 📁 Project Structure

```
src/
├── api.js              # API configuration and methods
├── App.jsx             # Main app component with routing
├── main.jsx            # Application entry point
└── Pages/
    ├── Dashboard.jsx   # Main dashboard with session discovery
    ├── MySessions.jsx  # User session management
    ├── LandingPage.jsx # Landing page
    └── Account_Signing.jsx # Authentication pages
```

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔧 API Endpoints Used

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Sessions
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/my` - Get user's sessions
- `GET /api/sessions/:id` - Get specific session
- `POST /api/sessions` - Create new session
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session
- `PATCH /api/sessions/:id/publish` - Publish session
- `POST /api/sessions/:id/like` - Like session
- `POST /api/sessions/:id/bookmark` - Bookmark session

### Search & Filter
- `GET /api/sessions/search` - Search sessions
- `GET /api/sessions/categories` - Get categories
- `GET /api/sessions/levels` - Get difficulty levels

## 🎨 UI Components

### Reusable Components
- **SessionCard**: Interactive session display with actions
- **LoadingSpinner**: Consistent loading states
- **ErrorMessage**: Error display with retry functionality
- **SuccessToast**: Success notifications
- **SearchAndFilter**: Advanced search and filtering interface
- **Tabs**: Tab navigation for different views

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: CSS variables for theming
- **Custom Animations**: Smooth transitions and micro-interactions

## 🔄 State Management

### Local State
- Session data and filtering
- User authentication state
- UI state (loading, errors, modals)
- Form data and validation

### Real-time Updates
- Session likes and bookmarks
- Session status changes (draft → published)
- User authentication status

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Image Optimization**: Fallback images and error handling
- **Debounced Search**: Optimized search performance
- **Memoization**: React.memo for expensive components
- **Code Splitting**: Route-based code splitting

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Authentication guards
- **Input Sanitization**: XSS prevention
- **CSRF Protection**: Token-based CSRF protection
- **Secure Headers**: Proper security headers

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoint System**: Tailwind's responsive breakpoints
- **Touch Friendly**: Large touch targets for mobile
- **Progressive Enhancement**: Core functionality works without JavaScript

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Offline support with service workers
- [ ] Advanced analytics dashboard
- [ ] Social sharing features
- [ ] Video session support
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] User profile management
- [ ] Session scheduling
- [ ] Payment integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
