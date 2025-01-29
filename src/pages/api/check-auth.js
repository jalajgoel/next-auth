// // pages/api/check-auth.js

// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../../app/lib/pasport'; // JWT secret key
// import User from '../../models/User'; // User model

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       // Get the token from the Authorization header
//       const token = req.headers.authorization?.split(' ')[1];

//       if (!token) {
//         return res.status(401).json({ error: 'Token not provided' });
//       }

//       // Verify the token
//       const decoded = jwt.verify(token, JWT_SECRET);

//       // Fetch the user from DB using the decoded token ID
//       const user = await User.findById(decoded.id);
      
//       if (!user) {
//         return res.status(401).json({ error: 'User not found' });
//       }

//       // Return the user information
//       return res.status(200).json({ user });

//     } catch (err) {
//       return res.status(401).json({ error: 'Invalid or expired token' });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
