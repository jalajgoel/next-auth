// pages/api/auth/facebook.js
import passport from '../../../app/lib/pasport';

export default function handler(req, res) {
  passport.authenticate('facebook', {
    scope: ['email'],
  })(req, res);
}
