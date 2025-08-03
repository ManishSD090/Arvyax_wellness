# 🌿 Arvyax Wellness Platform

A secure, full-stack wellness session platform where users can create, draft, edit, and publish personalized wellness sessions like yoga or meditation. Built using **React.js**, **Node.js + Express**, **MongoDB**, and **JWT authentication**. Supports auto-saving drafts, protected routes, and fully responsive design.

---

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://arvyax-wellness-blond.vercel.app/](https://your-frontend-url.vercel.app)
- **Backend (Render)**: [https://arvyax-wellness-oujv.onrender.com](https://arvyax-wellness-oujv.onrender.com)

> 🔑 Test Login  
> Email: `test@example.com`  
> Password: `password123`

---

## 📁 Project Structure

```
arvyax-wellness/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── seedData.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── Pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
├── README.md
└── setup.js
```

---

## 🧠 Features

### ✅ Authentication
- User registration & login with JWT tokens
- Passwords hashed using bcryptjs
- Protected routes with middleware
- JWT stored in localStorage

### ✅ Session Management
- Save, update, and publish sessions
- Auto-save drafts after 5s of inactivity
- View all public sessions on dashboard
- "My Sessions" page for user-specific content
- Delete session functionality

### ✅ Frontend Highlights
- Built with React + Vite
- Responsive UI (mobile & desktop)
- Real-time form updates
- Notifications with auto-save feedback
- Session editing with dynamic routing

---

## 🔧 API Reference

### 🔐 Auth Routes
| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | `/auth/register` | Register a new user  |
| POST   | `/auth/login`    | Login with credentials |
| GET    | `/auth/me`       | Get current user info |

### 🧘 Session Routes
| Method | Endpoint                   | Description                  |
|--------|----------------------------|------------------------------|
| GET    | `/sessions`                | View all published sessions  |
| GET    | `/my-sessions`             | View own sessions (auth)     |
| GET    | `/my-sessions/:id`         | Get one specific session     |
| POST   | `/my-sessions/save-draft`  | Save or update draft         |
| POST   | `/my-sessions/publish`     | Publish a session            |
| DELETE | `/my-sessions/:id`         | Delete a session             |

---

## 🗄️ Database Models

### 👤 User
```js
{
  _id,
  email: String,
  password_hash: String,
  created_at
}
```

### 🧘 Session
```js
{
  _id,
  user_id: ObjectId,
  title: String,
  tags: [String],
  json_file_url: String,
  status: "draft" | "published",
  created_at,
  updated_at
}
```

---

## 📦 Environment Variables

### Backend `.env.example`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend `.env.example`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 💻 Run Locally

```bash
# Clone the project
git clone https://github.com/ManishSD090/Arvyax_wellness.git

# Backend setup
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

---

## 🧪 Testing Instructions

- Login using test credentials or register a new account
- Try creating sessions with title, tags, and a JSON file URL
- Wait 5 seconds — auto-save will trigger
- You can publish the session or keep it as a draft
- Go to "My Sessions" to edit or delete sessions

---

## 🛠 Deployment Notes

### Backend (Render)
- Node version: 22
- Start command: `npm start`
- Environment vars configured in Render dashboard

### Frontend (Vercel)
- React + Vite frontend
- Environment variable: `VITE_API_BASE_URL=https://your-backend-url`

---

## ✅ Submission Checklist

- [x] Frontend + Backend in GitHub repo
- [x] .env.example files for both
- [x] Auto-save, publish, edit, delete session
- [x] Protected routes with JWT
- [x] Deployed demo (Render + Vercel)
- [x] README with setup & docs
- [x] Test credentials included

---

## 👋 Author

**Manish Suryavanshi**  
Aspiring full-stack web developer  
[GitHub](https://github.com/ManishSD090/Arvyax_wellness)

---

## 📝 License

MIT License — use freely & responsibly.
