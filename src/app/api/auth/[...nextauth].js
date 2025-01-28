import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

const authOptions = {
  providers: [
    // Google Authentication Provider
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Facebook Authentication Provider
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    // Credentials provider for custom JWT login
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connecting to DB (MongoDB)
        await connectDB();
        // Search for user in DB by email
        const user = await User.findOne({ email: credentials.email });
        if (user && user.password === credentials.password) {
          // If credentials match, return user object to sign in
          return user;
        } else {
          // If no user found or password is incorrect, return null (authentication failed)
          return null;
        }
      },
    }),
  ],
  
  // Secret used to encrypt session cookies
  secret: process.env.NEXTAUTH_SECRET,
  
  // JWT session config
  session: {
    jwt: true,
  },
  
  // Custom JWT callback (add user data to the token)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  
  // MongoDB Adapter (optional)
  database: process.env.MONGODB_URI,
};

export default (req, res) => NextAuth(req, res, authOptions);
