import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Yoga', 'Meditation', 'Breathing', 'Relaxation', 'Mindfulness', 'Wellness']
  },
  level: { 
    type: String, 
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels']
  },
  duration: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  tags: [{ 
    type: String 
  }],
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  bookmarks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  views: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true 
});

// Add indexes for better query performance
sessionSchema.index({ category: 1, level: 1 });
sessionSchema.index({ status: 1, creator: 1 });
sessionSchema.index({ title: 'text', description: 'text' });

const Session = mongoose.model('Session', sessionSchema);
export default Session; 