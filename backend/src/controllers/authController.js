import { model } from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateTokern.js";

const regristerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already Exist",
      });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      _id: User._id,
      name: name,
      email: email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,

        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export { regristerUser, loginUser };
