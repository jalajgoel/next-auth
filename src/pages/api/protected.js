// pages/api/protected.js
import passport from '../../app/lib/pasport'; // Import passport with the strategies

export default async function handler(req, res) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Send protected content if authenticated
    res.status(200).json({ message: 'Protected Content', user });
  })(req, res); // Execute passport authentication directly here
}
