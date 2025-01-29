import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User'; // Assuming you have a User model
import connectDB from '../../app/lib/mongodb'; // Your DB connection

const JWT_SECRET = process.env.JWT_SECRET || '114bdc8d9871c0004b039e3257b6e67a91e8ff9dfc6f9d2bec4b60cf9fd70f4b';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      await connectDB(); // Connect to MongoDB

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      // Respond with the token
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
