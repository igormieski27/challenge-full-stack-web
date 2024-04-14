const User = require("../models/userModel");
const { generateToken } = require("../middlewares/helpers/jwtHelper");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    const token = generateToken(newUser);
    res.status(201).json({ newUser, token });
  } catch (error) {
    if (error.message.includes("users_email_unique")) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await User.update(id, { name, email, password });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.delete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = generateToken(user);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
