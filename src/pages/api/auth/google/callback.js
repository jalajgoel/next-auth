// pages/api/auth/google/callback.js
import passport from '../../../../app/lib/pasport'; // Import passport with the Google strategy

export default async function handler(req, res) {
  passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication failed' });
    }
    // Store user information in session or send JWT token for the client to store
    res.redirect('/protected'); // Redirect to a dashboard or home page after login
  })(req, res);
}
