import User from "../models/UserSchema";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "users not found." });
  }
};

export const getUser = async () => {};

export const updateUser = async () => {};

export const uploadProfile = async () => {};

export const uploadBanner = async () => {};
