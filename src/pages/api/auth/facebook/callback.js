// pages/api/auth/facebook/callback.js
import passport from '../../../../app/lib/pasport';

export default function handler(req, res) {
  passport.authenticate('facebook', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Authentication failed' });
    }

    // Here, you can create a JWT token for the user and send it to the client
    const token = jwt.sign({ id: user._id }, '114bdc8d9871c0004b039e3257b6e67a91e8ff9dfc6f9d2bec4b60cf9fd70f4b', { expiresIn: '1h' });

    res.status(200).json({ token });
  })(req, res);
}
