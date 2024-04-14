const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Bodyparser = require('body-parser')


exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.login = async (req, res) => {
  try {
    const { emailLogin, passwordLogin } = req.body;
    email = emailLogin
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(passwordLogin, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "itstudio", { expiresIn: '1h' });
    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal server error ${error}` });
  }
};