const express = require("express");
const router = express.Router();

const {getAllMenuItems, getMenuItemById} = require("../controllers/menuController");

router.get("/", getAllMenuItems);


module.exports = router;