// Import necessary modules and User model
const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    name: user.name,
    email: user.email,
  };

  const options = {
    expiresIn: "1h", // token expiration time
  };

  return jwt.sign(payload, process.env.MY_SECRET, options);
}

// Function to create a new user
const createUser = async (req, res) => {
  // Extract user data from the request body
  const {
    name,
    password,
    email,
    mobile,
    first_name,
    last_name,
    user_type,
    status,
  } = req.body;

  try {
    // Create a new user with the provided data
    const user = await User.create({
      name,
      password,
      email,
      mobile,
      first_name,
      last_name,
      user_type,
      status,
    });
    res.json({ message: "User created successfully", data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Function to fetch all active users
const findAllUser = async (req, res) => {
  try {
    // Find all users with "Active" status
    const user = await User.find({ status: "Active" });
    res.json({ message: "List all active users successfully...", data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Function to check user login credentials
const loginCheck = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user with the provided email and password
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ error: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.json({ message: "Login successful", token: token, data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Function to update a user by their ID
const updateByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: "No such user" });
    }

    // Find and update a user by their ID with the provided data
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!user) {
      return res.json({ error: "No such user" });
    }

    res.json({
      message: "Updated user details by ID successfully...",
      data: user,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Function to delete a user by their ID
const deleteByUserID = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: "No such user" });
    }

    // Find and delete a user by their ID
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.json({ error: "No such user" });
    }
    res.json({ message: "Delete user details successfully...", data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Export all functions for use in other parts of the application
module.exports = {
  createUser,
  findAllUser,
  updateByUserId,
  deleteByUserID,
  loginCheck,
};
