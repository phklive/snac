import mongoose from "mongoose";

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
      type: Array,
      default: [],
    },
    snacs: {
      type: Array,
      default: [],
    },
    description: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
