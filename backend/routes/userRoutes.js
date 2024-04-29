const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

const { authenticate } = require("../middleware/authMiddleware");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/all", authenticate, getAllUsers);

module.exports = router;
