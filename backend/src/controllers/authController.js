import { model } from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

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

export { regristerUser };
