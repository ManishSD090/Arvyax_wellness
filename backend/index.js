import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import { auth } from './middleware/authMiddleware.js';
import { initializeDatabase } from './initDatabase.js';

dotenv.config();
console.log('🌱 Starting backend...');
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Get current user (protected route)
app.get('/api/auth/me', auth, (req, res) => {
  res.json(req.user);
});

app.get('/', (req, res) => res.send('🌿 Arvyax backend up and running'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    
    // Initialize database with sessions
    try {
      await initializeDatabase();
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
    }
    
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
