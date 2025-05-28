import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String, // hashed
  name: String,
  isAdmin: Boolean,
  createdAt: Date,
});
