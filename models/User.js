import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Ensure password is hashed before saving
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
