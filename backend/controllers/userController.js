const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  let success = false;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    success = false;
    res.status(400).json({ success, message: "Please enter all fields" });
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    success = false;
    res
      .status(400)
      .json({ success, message: "User with email already exists" });
    throw new Error("User with email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    success = true;
    res.status(201).json({
      success,
      token: generateToken(user._id),
    });
  } else {
    success = false;
    res.status(400).json(success, "Invalid user data");
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  let success = false;

  const { email, password } = req.body;

  if (!email || !password) {
    success = false;
    res.status(400).json({ success, message: "Please enter all fields" });
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    success = true;
    res.status(201).json({
      token: generateToken(user._id),
      success,
    });
  } else {
    success = false;
    res.status(400).json({ success, message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.isAdmin) {
    const users = await User.find({ isAdmin: false }, "_id name");

    const userIdsAndNames = users.map((user) => ({
      _id: user._id,
      name: user.name,
    }));

    res.status(200).json(userIdsAndNames);
  } else {
    res.status(403).json({ message: "Only admin can access this resource" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
