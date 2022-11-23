import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema";
import { Request, Response } from "express";

// Check email

export const checkMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const mailExists = await User.findOne({ email: email });

    if (mailExists) {
      return res.status(500).json({ msg: "Email already in use." });
    }

    return res.status(200);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Register User

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    delete savedUser.password;

    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Login User

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
