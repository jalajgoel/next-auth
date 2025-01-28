import { connectToDatabase } from "@/lib/db";
import passport from "@/lib/passport";
import nextConnect from "next-connect";

export const POST = nextConnect()
  .use(passport.initialize())
  .use(passport.authenticate("local"))
  .post((req, res) => {
    req.logIn(req.user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error logging in" });
      }

      res.status(200).json({ message: "Logged in successfully", user: req.user });
    });
  });
