const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createContact, getMessages, deleteMessage } = require("../controllers/contact");

// PUBLIC: For customers to send you messages
router.post('/', createContact);

// ADMIN ONLY: To view and delete messages in the Admin Panel
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

module.exports = router;