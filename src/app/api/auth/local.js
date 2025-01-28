import passport from 'passport';
import initPassport from '../../../../lib/passport';

initPassport();

export default function handler(req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ error: info?.message || 'Authentication failed' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  })(req, res);
}
