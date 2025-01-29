// lib/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
import User from '../../models/User'; // The User model

const JWT_SECRET = process.env.JWT_SECRET || '114bdc8d9871c0004b039e3257b6e67a91e8ff9dfc6f9d2bec4b60cf9fd70f4b'; // Use an environment variable for the secret key
console.log('hi',JWT_SECRET)
// JWT Strategy for API authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}, async (jwtPayload, done) => {
  console.log('jwtPayload', jwtPayload)
  try {
    const user = await User.findById(jwtPayload.userId);
    if (!user) {
      return done(null, false); // No user found, reject.
    }
    return done(null, user); // User found, accept.
  } catch (err) {
    return done(err, false); // Handle error
  }
}));

// Google OAuth Strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID, // Use your Google OAuth client ID
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Use your Google OAuth client secret
//   callbackURL: 'http://localhost:3000/api/auth/google/callback', // Your Google OAuth callback URL
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
//     if (!user) {
//       // Create a new user if not found
//       user = new User({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         name: profile.displayName,
//       });
//       await user.save();
//     }
//     return done(null, user);
//   } catch (err) {
//     return done(err, false);
//   }
// }));

// // Facebook OAuth Strategy
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID, // Use your Facebook App ID
//   clientSecret: process.env.FACEBOOK_APP_SECRET, // Use your Facebook App secret
//   callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
//   profileFields: ['id', 'emails', 'name'], // Specify the data you want from Facebook
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ facebookId: profile.id });
//     if (!user) {
//       // Create a new user if not found
//       user = new User({
//         facebookId: profile.id,
//         email: profile.emails[0].value,
//         name: profile.displayName,
//       });
//       await user.save();
//     }
//     return done(null, user);
//   } catch (err) {
//     return done(err, false);
//   }
// }));

export default passport;
