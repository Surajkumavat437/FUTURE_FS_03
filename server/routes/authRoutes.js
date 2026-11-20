const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

// This maps to POST http://localhost:5000/api/auth/login
router.post("/login", loginUser);

module.exports = router;