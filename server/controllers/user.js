import { readFileSync } from "fs";
import User from "../models/UserSchema";
import { imagekit } from "../utils/imageKit";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "users not found." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "user not found." });
  }
};

export const updateText = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name: name, bio: bio },
      { new: true }
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await imagekit.upload({
      file: readFileSync("uploads/" + req.file.filename),
      fileName: req.file.filename,
    });

    const imageUrl = response.url;

    const user = await User.findByIdAndUpdate(
      id,
      { profile: imageUrl },
      { new: true }
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await imagekit.upload({
      file: readFileSync("uploads/" + req.file.filename),
      fileName: req.file.filename,
    });

    const imageUrl = response.url;

    const user = await User.findByIdAndUpdate(
      id,
      { banner: imageUrl },
      { new: true }
    );

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
