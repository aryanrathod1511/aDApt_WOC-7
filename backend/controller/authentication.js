const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../db/schema");

const signup = async (req, res) => {
  try {
    const { fullName, password, email } = req.body; // Destructure directly

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists with this email id" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      name: fullName,
      password: hashedPassword,
      email,
      role: "student",
    });
    await newUser.save();

    res.status(200).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure directly

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

const adminSignup = async (req, res) => {
  try {
    const { fullName, password, email, admincode } = req.body; // Destructure directly

    // Check if the user exists
    const user = await userModel.findOne({ email: email , role:"admin"});
    if (user) {
      return res.status(400).json({ msg: "Admin already exists with this email id" });
    }

    // check admin key
    const isAdminCodeCorrect = admincode === process.env.ADMIN_KEY;
    if(!isAdminCodeCorrect){
        res.status(401).json({msg: "Incorrect admin key"});
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newUser = new userModel({
      name: fullName,
      password: hashedPassword,
      email,
      role: "admin",
    });
    await newUser.save();

    res.status(200).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password, admincode } = req.body; // Destructure directly

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    // Check password and admin code
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    const isAdminCodeCorrect = user.admincode === process.env.ADMIN_KEY;

    if (!isPasswordCorrect || !isAdminCodeCorrect) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = {
  adminLogin,
  adminSignup,
  signup,
  login,
};
