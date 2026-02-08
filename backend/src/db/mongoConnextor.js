import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/discord-oauth";

export async function connectMongo() {
  const uri = process.env.MONGO_URL || DEFAULT_URI;

  if (mongoose.connection.readyState !== 0) {
    console.log("MongoDB connection ready");
    return mongoose;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected: " + uri);
    return mongoose;
  } catch (err) {
    console.log("MongoDB connection error: " + err);
    throw err;
  }
}
