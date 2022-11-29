import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema";

// Check email

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const lowerEmail = String(email).toLowerCase();

    const mailExists = await User.findOne({ email: lowerEmail });

    if (mailExists) {
      return res.status(500).json({ msg: "Email already in use." });
    }

    return res.status(200).json({ msg: "Email is not in use." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register User

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const lowerEmail = String(email).toLowerCase();
    const lowerName = String(name).toLowerCase();

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: lowerEmail,
      password: passwordHash,
      name: lowerName,
      favs: [],
      snacs: [],
      profile: "",
      banner: "",
      bio: "",
      score: 0,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = String(email).toLowerCase();
    const user = await User.findOne({ email: lowerEmail });
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User

export const getMe = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "not able to get user" });
  }
};
