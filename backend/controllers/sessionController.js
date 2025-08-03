import Session from '../models/Session.js';

// Get all published sessions
export const getAllSessions = async (req, res) => {
  try {
    const { page, limit, category, level, search } = req.query;
    
    let query = { status: 'published' };
    
    // Apply filters
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$text = { $search: search };
    }
    
    // If no pagination parameters are provided, return all sessions
    if (!page && !limit) {
      const sessions = await Session.find(query)
        .populate('creator', 'username')
        .sort({ createdAt: -1 });
      
      const total = await Session.countDocuments(query);
      
      res.json({
        sessions,
        totalPages: 1,
        currentPage: 1,
        total
      });
    } else {
      // Apply pagination if parameters are provided
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      
      const sessions = await Session.find(query)
        .populate('creator', 'username')
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum);
      
      const total = await Session.countDocuments(query);
      
      res.json({
        sessions,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        total
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's sessions (drafts and published)
export const getMySessions = async (req, res) => {
  try {
    console.log('Getting sessions for user:', req.user._id);
    
    const sessions = await Session.find({ creator: req.user._id })
      .sort({ updatedAt: -1 });
    
    console.log(`Found ${sessions.length} sessions for user ${req.user._id}`);
    console.log('Sessions:', sessions.map(s => ({ id: s._id, title: s.title, status: s.status })));
    
    res.json(sessions);
  } catch (error) {
    console.error('Error in getMySessions:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single session by ID
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('creator', 'username')
      .populate('likes', 'username')
      .populate('bookmarks', 'username');
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Increment views
    session.views += 1;
    await session.save();
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new session
export const createSession = async (req, res) => {
  try {
    const { title, description, category, level, duration, image, tags } = req.body;
    
    console.log('Creating session for user:', req.user._id);
    console.log('Session data:', { title, category, level, duration, status: req.body.status });
    
    const session = new Session({
      title,
      description,
      category,
      level,
      duration,
      image,
      tags,
      creator: req.user._id
    });
    
    const savedSession = await session.save();
    console.log('Session created successfully:', savedSession._id);
    
    res.status(201).json(savedSession);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update session
export const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Check if user owns the session
    if (session.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete session
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Check if user owns the session
    if (session.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publish session
export const publishSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Check if user owns the session
    if (session.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    session.status = 'published';
    const updatedSession = await session.save();
    
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike session
export const likeSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    const likeIndex = session.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Unlike
      session.likes.splice(likeIndex, 1);
    } else {
      // Like
      session.likes.push(req.user._id);
    }
    
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bookmark/Unbookmark session
export const bookmarkSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    const bookmarkIndex = session.bookmarks.indexOf(req.user._id);
    
    if (bookmarkIndex > -1) {
      // Remove bookmark
      session.bookmarks.splice(bookmarkIndex, 1);
    } else {
      // Add bookmark
      session.bookmarks.push(req.user._id);
    }
    
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search sessions
export const searchSessions = async (req, res) => {
  try {
    const { q, category, level, page, limit } = req.query;
    
    let query = { status: 'published' };
    
    if (q) {
      query.$text = { $search: q };
    }
    if (category) query.category = category;
    if (level) query.level = level;
    
    // If no pagination parameters are provided, return all sessions
    if (!page && !limit) {
      const sessions = await Session.find(query)
        .populate('creator', 'username')
        .sort({ createdAt: -1 });
      
      const total = await Session.countDocuments(query);
      
      res.json({
        sessions,
        totalPages: 1,
        currentPage: 1,
        total
      });
    } else {
      // Apply pagination if parameters are provided
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      
      const sessions = await Session.find(query)
        .populate('creator', 'username')
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum);
      
      const total = await Session.countDocuments(query);
      
      res.json({
        sessions,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        total
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Session.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get levels
export const getLevels = async (req, res) => {
  try {
    const levels = await Session.distinct('level');
    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Debug endpoint to check database status
export const debugSessions = async (req, res) => {
  try {
    const totalSessions = await Session.countDocuments();
    const userSessions = await Session.countDocuments({ creator: req.user._id });
    const userSessionsList = await Session.find({ creator: req.user._id }).select('title status createdAt');
    
    res.json({
      totalSessions,
      userSessions,
      userSessionsList,
      userId: req.user._id
    });
  } catch (error) {
    console.error('Error in debugSessions:', error);
    res.status(500).json({ message: error.message });
  }
}; 