// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  number:   { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// ✅ Export default for ESModules
const User = mongoose.model('User', userSchema);
export default User;
