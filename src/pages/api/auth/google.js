// pages/api/auth/google.js
import passport from '../../../app/lib/pasport'

export default function handler(req, res) {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res);
}
