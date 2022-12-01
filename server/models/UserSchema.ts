import mongoose from "mongoose";
import { DigiSchema } from "./DigiSchema";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    favs: {
      type: [String],
      default: [],
    },
    score: Number,
    bio: String,
    banner: String,
    profile: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
