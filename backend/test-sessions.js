import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Session from './models/Session.js';

dotenv.config();

const testSessions = async () => {
  try {
    console.log('🧪 Testing sessions...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Count all sessions
    const totalSessions = await Session.countDocuments();
    console.log(`📊 Total sessions in database: ${totalSessions}`);
    
    // Get all published sessions
    const publishedSessions = await Session.find({ status: 'published' });
    console.log(`📝 Published sessions: ${publishedSessions.length}`);
    
    // Display session titles
    console.log('\n📋 Available sessions:');
    publishedSessions.forEach((session, index) => {
      console.log(`${index + 1}. ${session.title} (${session.duration}) - ${session.category}`);
    });
    
    console.log('\n✅ Session test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing sessions:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
};

// Run the test
testSessions(); 