import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(
      `DB connected: ${conn.connection.name}, ${conn.connection.host}`
    );
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}
