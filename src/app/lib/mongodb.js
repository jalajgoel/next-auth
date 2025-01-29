import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const dbUri = process.env.MONGODB_URI; // Store Mongo URI in .env
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit on failure to connect
  }
};

export default connectDb;
