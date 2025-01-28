import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://expertdeveloper5821:2MRa40Pbkr7Y2M1u@cluster0.3yku5.mongodb.net/";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)  // No need to pass useNewUrlParser and useUnifiedTopology anymore
      .then((mongoose) => mongoose)
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw new Error("Could not connect to MongoDB");
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
