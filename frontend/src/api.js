// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/Account_Signing';
    }
    return Promise.reject(error);
  }
);

// Sample data for testing when backend is not available
const sampleSessions = [
  {
    id: 1,
    title: "Morning Yoga Flow",
    category: "Yoga",
    level: "Beginner",
    duration: "30min",
    description: "Start your day with energizing poses and mindful breathing. This gentle flow sequence will awaken your body and mind, setting a positive tone for the day ahead.",
    image: "https://images.unsplash.com/photo-1506629905607-c65b4023b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 12,
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-20T10:00:00Z"
  },
  {
    id: 2,
    title: "Mindful Meditation",
    category: "Meditation",
    level: "All Levels",
    duration: "15min",
    description: "Guided session for stress relief and mental clarity. Learn to quiet your mind and find inner peace through simple breathing techniques.",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 8,
    isLiked: true,
    isBookmarked: false,
    createdAt: "2024-01-19T15:30:00Z"
  },
  {
    id: 3,
    title: "Sound Healing Journey",
    category: "Relaxation",
    level: "Advanced",
    duration: "45min",
    description: "Deep relaxation through therapeutic sound frequencies. Experience the healing power of sound as you drift into a state of deep tranquility.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 25,
    isLiked: false,
    isBookmarked: true,
    createdAt: "2024-01-18T09:15:00Z"
  },
  {
    id: 4,
    title: "Evening Wind Down",
    category: "Yoga",
    level: "Intermediate",
    duration: "40min",
    description: "Gentle stretches and breathing exercises for restful sleep. Perfect for unwinding after a busy day and preparing your body for deep sleep.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 15,
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-17T18:45:00Z"
  },
  {
    id: 5,
    title: "Breathing Mastery",
    category: "Breathing",
    level: "All Levels",
    duration: "20min",
    description: "Learn powerful breathing techniques for stress management. Master the art of conscious breathing to reduce anxiety and improve focus.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 18,
    isLiked: true,
    isBookmarked: true,
    createdAt: "2024-01-16T14:20:00Z"
  },
  {
    id: 6,
    title: "Sun Salutation Flow",
    category: "Yoga",
    level: "Beginner",
    duration: "25min",
    description: "Classic yoga sequence to energize your body and mind. Perfect for morning practice to greet the day with vitality and intention.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 22,
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-15T08:30:00Z"
  },
  {
    id: 7,
    title: "Deep Meditation Retreat",
    category: "Meditation",
    level: "Advanced",
    duration: "60min",
    description: "Extended meditation session for deep inner exploration. Journey into your consciousness and discover profound peace and clarity.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 35,
    isLiked: true,
    isBookmarked: true,
    createdAt: "2024-01-14T16:45:00Z"
  },
  {
    id: 8,
    title: "Restorative Yoga",
    category: "Yoga",
    level: "All Levels",
    duration: "35min",
    description: "Gentle, healing practice using props to support your body. Perfect for recovery, stress relief, and deep relaxation.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 19,
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-13T12:15:00Z"
  },
  {
    id: 9,
    title: "Box Breathing Technique",
    category: "Breathing",
    level: "Intermediate",
    duration: "12min",
    description: "Learn the powerful box breathing method used by Navy SEALs. Improve focus, reduce stress, and enhance mental clarity.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 28,
    isLiked: true,
    isBookmarked: false,
    createdAt: "2024-01-12T10:30:00Z"
  },
  {
    id: 10,
    title: "Loving Kindness Meditation",
    category: "Meditation",
    level: "Intermediate",
    duration: "20min",
    description: "Cultivate compassion and love for yourself and others. This heart-opening practice will transform your relationships and inner peace.",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 31,
    isLiked: false,
    isBookmarked: true,
    createdAt: "2024-01-11T14:20:00Z"
  },
  {
    id: 11,
    title: "Core Strength Yoga",
    category: "Yoga",
    level: "Intermediate",
    duration: "45min",
    description: "Build a strong, stable core through targeted yoga poses. Improve posture, balance, and overall body strength.",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 24,
    isLiked: true,
    isBookmarked: false,
    createdAt: "2024-01-10T09:45:00Z"
  },
  {
    id: 12,
    title: "Mindful Walking",
    category: "Mindfulness",
    level: "All Levels",
    duration: "30min",
    description: "Transform your daily walks into meditation practice. Learn to walk with awareness and presence in nature.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 16,
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-09T07:30:00Z"
  },
  {
    id: 13,
    title: "Quick Office Yoga",
    category: "Yoga",
    level: "Beginner",
    duration: "8min",
    description: "Simple yoga poses you can do at your desk. Perfect for busy professionals to stay active and reduce workplace stress.",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 42,
    isLiked: false,
    isBookmarked: true,
    createdAt: "2024-01-08T14:20:00Z"
  },
  {
    id: 14,
    title: "Chakra Balancing",
    category: "Wellness",
    level: "Intermediate",
    duration: "35min",
    description: "Align and balance your seven energy centers through guided meditation and visualization. Restore harmony to your entire being.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 38,
    isLiked: true,
    isBookmarked: false,
    createdAt: "2024-01-07T11:30:00Z"
  },
  {
    id: 15,
    title: "Mindful Eating",
    category: "Mindfulness",
    level: "Beginner",
    duration: "12min",
    description: "Transform your relationship with food through mindful eating practices. Learn to eat with awareness and gratitude.",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 29,
    isLiked: false,
    isBookmarked: true,
    createdAt: "2024-01-06T09:15:00Z"
  },
  {
    id: 16,
    title: "Sleep Meditation",
    category: "Meditation",
    level: "All Levels",
    duration: "15min",
    description: "Gentle guided meditation to help you fall asleep naturally. Create a peaceful bedtime routine for deep, restful sleep.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 51,
    isLiked: true,
    isBookmarked: true,
    createdAt: "2024-01-05T20:45:00Z"
  },
  {
    id: 17,
    title: "Body Scan Meditation",
    category: "Meditation",
    level: "Beginner",
    duration: "18min",
    description: "Systematic journey through your body with mindful awareness. Perfect for beginners to learn body-mind connection.",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 33,
    isLiked: false,
    isBookmarked: false,
    createdAt: "2024-01-04T16:20:00Z"
  },
  {
    id: 18,
    title: "Stress Relief Breathing",
    category: "Breathing",
    level: "All Levels",
    duration: "5min",
    description: "Quick breathing techniques to instantly reduce stress and anxiety. Use these methods anywhere, anytime for immediate relief.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 67,
    isLiked: true,
    isBookmarked: false,
    createdAt: "2024-01-03T12:10:00Z"
  }
];

const sampleMySessions = [
  {
    id: 1,
    title: "Morning Meditation Guide",
    category: "Meditation",
    level: "Beginner",
    duration: "15min",
    description: "A gentle morning meditation to start your day with clarity and peace. Perfect for beginners looking to establish a daily practice.",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "published",
    updatedAt: "2024-01-20T08:00:00Z"
  },
  {
    id: 2,
    title: "Advanced Power Yoga",
    category: "Yoga",
    level: "Advanced",
    duration: "60min",
    description: "Intensive yoga session focusing on strength, flexibility, and mental discipline. For experienced practitioners seeking a challenging workout.",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "published",
    updatedAt: "2024-01-19T14:30:00Z"
  },
  {
    id: 3,
    title: "Stress Relief Breathing",
    category: "Breathing",
    level: "All Levels",
    duration: "10min",
    description: "Quick breathing techniques to instantly reduce stress and anxiety. Use these methods anywhere, anytime for immediate relief.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "published",
    updatedAt: "2024-01-18T16:45:00Z"
  },
  {
    id: 4,
    title: "Mindful Eating Practice",
    category: "Mindfulness",
    level: "Beginner",
    duration: "20min",
    description: "Transform your relationship with food through mindful eating practices. Learn to eat with awareness and gratitude.",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "draft",
    updatedAt: "2024-01-17T12:20:00Z"
  },
  {
    id: 5,
    title: "Restorative Evening Flow",
    category: "Yoga",
    level: "Intermediate",
    duration: "45min",
    description: "Gentle evening yoga sequence designed to release tension and prepare your body for restful sleep.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "published",
    updatedAt: "2024-01-16T19:15:00Z"
  },
  {
    id: 6,
    title: "Chakra Balancing Meditation",
    category: "Wellness",
    level: "Intermediate",
    duration: "30min",
    description: "Align and balance your seven energy centers through guided meditation and visualization. Restore harmony to your entire being.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "draft",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 7,
    title: "Quick Office Yoga",
    category: "Yoga",
    level: "Beginner",
    duration: "8min",
    description: "Simple yoga poses you can do at your desk. Perfect for busy professionals to stay active and reduce workplace stress.",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "published",
    updatedAt: "2024-01-14T11:45:00Z"
  },
  {
    id: 8,
    title: "Deep Sleep Meditation",
    category: "Meditation",
    level: "All Levels",
    duration: "15min",
    description: "Gentle guided meditation to help you fall asleep naturally. Create a peaceful bedtime routine for deep, restful sleep.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "published",
    updatedAt: "2024-01-13T21:00:00Z"
  }
];

// Auth API Methods
export const authAPI = {
  async signup(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// Sessions API Methods
export const sessionsAPI = {
  async getAllSessions() {
    try {
      // Don't pass any pagination parameters to get all sessions
      const response = await api.get('/sessions');
      return response.data.sessions || response.data;
    } catch (error) {
      console.warn('Backend not available, using sample data:', error.message);
      return sampleSessions;
    }
  },

  async getMySessions() {
    try {
      console.log('Calling getMySessions API...');
      const response = await api.get('/sessions/my/sessions');
      console.log('API Response:', response.data);
      
      // Ensure we return an array
      const sessions = Array.isArray(response.data) ? response.data : [];
      console.log('Processed sessions:', sessions);
      
      return sessions;
    } catch (error) {
      console.warn('Backend not available, using sample data:', error.message);
      console.log('Returning sample data for MySessions');
      return sampleMySessions;
    }
  },

  async getSessionById(id) {
    try {
      const response = await api.get(`/sessions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async createSession(sessionData) {
    try {
      console.log('Creating session with data:', sessionData);
      const response = await api.post('/sessions', sessionData);
      console.log('Session created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error(handleApiError(error));
    }
  },

  async updateSession(id, sessionData) {
    try {
      const response = await api.put(`/sessions/${id}`, sessionData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async deleteSession(id) {
    try {
      console.log('Deleting session:', id);
      const response = await api.delete(`/sessions/${id}`);
      console.log('Session deleted successfully');
      return response.data;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw new Error(handleApiError(error));
    }
  },

  async publishSession(id) {
    try {
      console.log('Publishing session:', id);
      const response = await api.patch(`/sessions/${id}/publish`);
      console.log('Session published successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error publishing session:', error);
      throw new Error(handleApiError(error));
    }
  },

  async likeSession(id) {
    try {
      const response = await api.post(`/sessions/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async bookmarkSession(id) {
    try {
      const response = await api.post(`/sessions/${id}/bookmark`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async debugSessions() {
    try {
      console.log('Calling debug sessions API...');
      const response = await api.get('/sessions/debug/sessions');
      console.log('Debug response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in debug sessions:', error);
      throw new Error(handleApiError(error));
    }
  },
};

// User API Methods
export const userAPI = {
  async updateProfile(userData) {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getBookmarks() {
    try {
      const response = await api.get('/users/bookmarks');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getLikedSessions() {
    try {
      const response = await api.get('/users/likes');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// Search and Filter API Methods
export const searchAPI = {
  async searchSessions(query, filters = {}) {
    try {
      const response = await api.get('/sessions/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getCategories() {
    try {
      const response = await api.get('/sessions/categories');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using sample categories:', error.message);
      return ['Yoga', 'Meditation', 'Breathing', 'Relaxation', 'Mindfulness', 'Wellness'];
    }
  },

  async getLevels() {
    try {
      const response = await api.get('/sessions/levels');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using sample levels:', error.message);
      return ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
    }
  },
};

// Token Utilities
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};
