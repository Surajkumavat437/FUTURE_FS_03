const express = require("express");
const router = express.Router();

const { getMenuRecommendation } = require("../controllers/aiController");


router.post("/menu", getMenuRecommendation);


module.exports = router;