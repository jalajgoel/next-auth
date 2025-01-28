import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "@/models/User";

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
