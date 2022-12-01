import Digi from "../models/DigiSchema";
import { readFileSync } from "fs";
import { imagekit } from "../utils/imageKit";
import User from "../models/UserSchema";

export const createDigi = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, description, price } = req.body;

    const user = await User.findById(id);

    const response = await imagekit.upload({
      file: readFileSync("uploads/" + req.file.filename),
      fileName: req.file.filename,
    });

    const imageUrl = response.url;

    const newDigi = new Digi({
      creator: id,
      owner: id,
      description: description,
      likes: 0,
      price: price,
      title: title,
      image: imageUrl,
      ownerImage: user.profile,
      ownerName: user.name,
    });

    const savedDigi = await newDigi.save();

    res.status(201).json(savedDigi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDigis = async (req, res) => {
  try {
    const digis = await Digi.find({
      $or: [{ owner: req.query.userId }, { creator: req.query.userId }],
    });

    res.status(200).json(digis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDigi = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDigis = async (req, res) => {
  try {
    const digis = await Digi.find({});
    res.status(200).json(digis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buyDigi = async (req, res) => {
  try {
    const { digiId, userId, userImage, userName } = req.body;
    const digi = await Digi.findByIdAndUpdate(digiId, {
      owner: userId,
      ownerImage: userImage,
      ownerName: userName,
    });
    res.status(201).json(digi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
