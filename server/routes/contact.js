const express = require('express');
const router = express.Router();
const {createContact} = require("../controllers/contact");

// Remove the extra '/contact' here. Just use '/'
router.post('/', createContact);

module.exports = router;