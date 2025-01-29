import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User'; // Assuming you have a User model
import connectDB from '../../app/lib/mongodb'; // Your DB connection

const JWT_SECRET = process.env.JWT_SECRET || '114bdc8d9871c0004b039e3257b6e67a91e8ff9dfc6f9d2bec4b60cf9fd70f4b'; // Ensure this is in your .env.local

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
      await connectDB(); // Connect to MongoDB

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      // Create a JWT token
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

      // Respond with the token
      res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
