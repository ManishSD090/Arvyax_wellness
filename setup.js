#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Arvyax Wellness Application...\n');

// Check if .env files exist and create them if not
const backendEnvPath = path.join(__dirname, 'backend', '.env');
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');

// Backend .env template
const backendEnvContent = `# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/arvyax-wellness

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
`;

// Frontend .env template
const frontendEnvContent = `# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Optional: Development settings
VITE_DEBUG_MODE=true
VITE_ENABLE_MOCK_DATA=false
`;

// Create backend .env if it doesn't exist
if (!fs.existsSync(backendEnvPath)) {
  fs.writeFileSync(backendEnvPath, backendEnvContent);
  console.log('✅ Created backend/.env file');
} else {
  console.log('ℹ️  backend/.env already exists');
}

// Create frontend .env if it doesn't exist
if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✅ Created frontend/.env file');
} else {
  console.log('ℹ️  frontend/.env already exists');
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies:', error.message);
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies:', error.message);
  process.exit(1);
}

// Seed the database
console.log('\n🌱 Seeding database with sample data...');
try {
  execSync('npm run seed', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Database seeded successfully');
} catch (error) {
  console.error('❌ Failed to seed database:', error.message);
  console.log('ℹ️  You can manually run "npm run seed" in the backend directory later');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📝 Next steps:');
console.log('1. Start MongoDB (if not already running)');
console.log('2. Start the backend: cd backend && npm run dev');
console.log('3. Start the frontend: cd frontend && npm run dev');
console.log('4. Open http://localhost:5173 in your browser');
console.log('\n📝 Test Credentials:');
console.log('Email: test@example.com');
console.log('Password: password123');
console.log('\n🔧 If you need to seed the database again, run: cd backend && npm run seed'); 