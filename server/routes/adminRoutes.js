const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/userController');

// This matches: POST http://localhost:5000/api/users/login
router.post('/login', loginAdmin);

module.exports = router;