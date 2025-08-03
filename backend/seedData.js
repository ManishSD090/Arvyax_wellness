import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Session from './models/Session.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const sampleSessions = [
  {
    title: "Morning Yoga Flow",
    description: "Start your day with energizing poses and mindful breathing. This gentle flow sequence will awaken your body and mind, setting a positive tone for the day ahead.",
    category: "Yoga",
    level: "Beginner",
    duration: "30min",
    image: "https://images.unsplash.com/photo-1506629905607-c65b4023b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Morning", "Energy", "Flow"],
    status: "published"
  },
  {
    title: "Mindful Meditation",
    description: "Guided session for stress relief and mental clarity. Learn to quiet your mind and find inner peace through simple breathing techniques.",
    category: "Meditation",
    level: "All Levels",
    duration: "15min",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Stress Relief", "Clarity", "Peace"],
    status: "published"
  },
  {
    title: "Sound Healing Journey",
    description: "Deep relaxation through therapeutic sound frequencies. Experience the healing power of sound as you drift into a state of deep tranquility.",
    category: "Relaxation",
    level: "Advanced",
    duration: "45min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Sound Healing", "Deep Relaxation", "Therapeutic"],
    status: "published"
  },
  {
    title: "Evening Wind Down",
    description: "Gentle stretches and breathing exercises for restful sleep. Perfect for unwinding after a busy day and preparing your body for deep sleep.",
    category: "Yoga",
    level: "Intermediate",
    duration: "40min",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Evening", "Sleep", "Relaxation"],
    status: "published"
  },
  {
    title: "Breathing Mastery",
    description: "Learn powerful breathing techniques for stress management. Master the art of conscious breathing to reduce anxiety and improve focus.",
    category: "Breathing",
    level: "All Levels",
    duration: "20min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Breathing", "Stress Management", "Focus"],
    status: "published"
  },
  {
    title: "Power Vinyasa Flow",
    description: "Dynamic flow sequence for strength and flexibility. Challenge your body with this energetic practice that builds both physical and mental strength.",
    category: "Yoga",
    level: "Advanced",
    duration: "50min",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Power", "Strength", "Dynamic"],
    status: "published"
  },
  {
    title: "Mindfulness for Beginners",
    description: "A gentle introduction to mindfulness practices. Learn the basics of being present and aware in your daily life.",
    category: "Mindfulness",
    level: "Beginner",
    duration: "10min",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Mindfulness", "Beginners", "Awareness"],
    status: "draft"
  },
  {
    title: "Stress Relief Techniques",
    description: "Quick and effective methods to reduce stress and anxiety. Learn practical techniques you can use anywhere, anytime.",
    category: "Wellness",
    level: "All Levels",
    duration: "15min",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Stress Relief", "Quick", "Practical"],
    status: "draft"
  },
  {
    title: "Sun Salutation Flow",
    description: "Classic yoga sequence to energize your body and mind. Perfect for morning practice to greet the day with vitality and intention.",
    category: "Yoga",
    level: "Beginner",
    duration: "25min",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Sun Salutation", "Morning", "Energy"],
    status: "published"
  },
  {
    title: "Deep Meditation Retreat",
    description: "Extended meditation session for deep inner exploration. Journey into your consciousness and discover profound peace and clarity.",
    category: "Meditation",
    level: "Advanced",
    duration: "60min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Deep Meditation", "Retreat", "Inner Peace"],
    status: "published"
  },
  {
    title: "Restorative Yoga",
    description: "Gentle, healing practice using props to support your body. Perfect for recovery, stress relief, and deep relaxation.",
    category: "Yoga",
    level: "All Levels",
    duration: "35min",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Restorative", "Healing", "Relaxation"],
    status: "published"
  },
  {
    title: "Box Breathing Technique",
    description: "Learn the powerful box breathing method used by Navy SEALs. Improve focus, reduce stress, and enhance mental clarity.",
    category: "Breathing",
    level: "Intermediate",
    duration: "12min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Box Breathing", "Focus", "Military Technique"],
    status: "published"
  },
  {
    title: "Loving Kindness Meditation",
    description: "Cultivate compassion and love for yourself and others. This heart-opening practice will transform your relationships and inner peace.",
    category: "Meditation",
    level: "Intermediate",
    duration: "20min",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Loving Kindness", "Compassion", "Heart Opening"],
    status: "published"
  },
  {
    title: "Core Strength Yoga",
    description: "Build a strong, stable core through targeted yoga poses. Improve posture, balance, and overall body strength.",
    category: "Yoga",
    level: "Intermediate",
    duration: "45min",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Core Strength", "Balance", "Posture"],
    status: "published"
  },
  {
    title: "Mindful Walking",
    description: "Transform your daily walks into meditation practice. Learn to walk with awareness and presence in nature.",
    category: "Mindfulness",
    level: "All Levels",
    duration: "30min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Walking Meditation", "Nature", "Awareness"],
    status: "published"
  },
  {
    title: "Energy Healing Session",
    description: "Experience deep energetic healing through guided visualization and breathwork. Release blockages and restore your natural energy flow.",
    category: "Wellness",
    level: "Advanced",
    duration: "40min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Energy Healing", "Visualization", "Breathwork"],
    status: "published"
  },
  {
    title: "Yin Yoga Deep Stretch",
    description: "Slow, meditative practice targeting deep connective tissues. Hold poses for longer periods to increase flexibility and release tension.",
    category: "Yoga",
    level: "Intermediate",
    duration: "50min",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Yin Yoga", "Deep Stretch", "Flexibility"],
    status: "published"
  },
  {
    title: "Body Scan Meditation",
    description: "Systematic journey through your body with mindful awareness. Perfect for beginners to learn body-mind connection.",
    category: "Meditation",
    level: "Beginner",
    duration: "18min",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Body Scan", "Awareness", "Mind-Body"],
    status: "published"
  },
  {
    title: "Pranayama Breathing",
    description: "Ancient yogic breathing techniques to control life force energy. Master pranayama for enhanced vitality and mental clarity.",
    category: "Breathing",
    level: "Advanced",
    duration: "25min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Pranayama", "Life Force", "Vitality"],
    status: "published"
  },
  {
    title: "Chakra Balancing",
    description: "Align and balance your seven energy centers through guided meditation and visualization. Restore harmony to your entire being.",
    category: "Wellness",
    level: "Intermediate",
    duration: "35min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Chakra", "Energy Centers", "Balance"],
    status: "published"
  },
  {
    title: "Quick Office Yoga",
    description: "Simple yoga poses you can do at your desk. Perfect for busy professionals to stay active and reduce workplace stress.",
    category: "Yoga",
    level: "Beginner",
    duration: "8min",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Office Yoga", "Desk Exercises", "Workplace Wellness"],
    status: "published"
  },
  {
    title: "Sleep Meditation",
    description: "Gentle guided meditation to help you fall asleep naturally. Create a peaceful bedtime routine for deep, restful sleep.",
    category: "Meditation",
    level: "All Levels",
    duration: "15min",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Sleep", "Bedtime", "Rest"],
    status: "published"
  },
  {
    title: "Stress Relief Breathing",
    description: "Quick breathing techniques to instantly reduce stress and anxiety. Use these methods anywhere, anytime for immediate relief.",
    category: "Breathing",
    level: "All Levels",
    duration: "5min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Quick Relief", "Stress", "Anxiety"],
    status: "published"
  },
  {
    title: "Mindful Eating",
    description: "Transform your relationship with food through mindful eating practices. Learn to eat with awareness and gratitude.",
    category: "Mindfulness",
    level: "Beginner",
    duration: "12min",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Mindful Eating", "Food Awareness", "Gratitude"],
    status: "published"
  },
  {
    title: "Advanced Ashtanga Flow",
    description: "Dynamic, challenging yoga sequence following the traditional Ashtanga method. Build strength, flexibility, and mental discipline.",
    category: "Yoga",
    level: "Advanced",
    duration: "75min",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Ashtanga", "Advanced", "Discipline"],
    status: "published"
  },
  {
    title: "Crystal Healing Meditation",
    description: "Harness the energy of crystals for healing and balance. Learn to work with crystal energy for emotional and physical wellness.",
    category: "Wellness",
    level: "Intermediate",
    duration: "30min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Crystal Healing", "Energy Work", "Balance"],
    status: "published"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create a test user if it doesn't exist
    let testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      testUser = await User.create({
        username: 'TestUser',
        email: 'test@example.com',
        number: '1234567890',
        password: hashedPassword
      });
      console.log('✅ Created test user');
    }

    // Clear existing sessions
    await Session.deleteMany({});
    console.log('✅ Cleared existing sessions');

    // Add sample sessions with the test user as creator
    const sessionsWithCreator = sampleSessions.map(session => ({
      ...session,
      creator: testUser._id
    }));

    await Session.insertMany(sessionsWithCreator);
    console.log('✅ Added sample sessions');

    // Get the created sessions
    const createdSessions = await Session.find({}).populate('creator', 'username');
    console.log(`✅ Successfully created ${createdSessions.length} sessions`);

    // Display created sessions
    createdSessions.forEach((session, index) => {
      console.log(`${index + 1}. ${session.title} (${session.status}) - Created by: ${session.creator.username}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase(); 