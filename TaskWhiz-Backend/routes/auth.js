const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Register a User
router.post("/sendotp", authController.sendOTP);

// Verify a User
router.post("/verifyotp", authController.verifyOTP);

// Register a User
router.post("/register", authController.signup);

module.exports = router;
