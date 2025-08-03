import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import {
  getAllSessions,
  getMySessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  publishSession,
  likeSession,
  bookmarkSession,
  searchSessions,
  getCategories,
  getLevels,
  debugSessions
} from '../controllers/sessionController.js';

const router = express.Router();

// Public routes
router.get('/', getAllSessions);
router.get('/search', searchSessions);
router.get('/categories', getCategories);
router.get('/levels', getLevels);
router.get('/:id', getSessionById);

// Protected routes (require authentication)
router.use(auth);

router.get('/my/sessions', getMySessions);
router.get('/debug/sessions', debugSessions);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);
router.patch('/:id/publish', publishSession);
router.post('/:id/like', likeSession);
router.post('/:id/bookmark', bookmarkSession);

export default router; 