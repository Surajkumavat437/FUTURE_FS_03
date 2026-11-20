const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { 
  getAllMenuItems, 
  getMenuItemById,
  createMenuItem,
  updateMenuItem, // 1. IMPORT the update controller
  deleteMenuItem
} = require("../controllers/menuController");

// PUBLIC ROUTES: Anyone can see the coffee menu
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);

// ADMIN ROUTES: Only a logged-in admin can change the menu

// CREATE - Post a new item with an image
router.post("/", protect, upload.single("image"), createMenuItem);

// UPDATE - Edit an existing item (including optional new image)
// We use .put or .patch and pass the /:id
router.put("/:id", protect, upload.single("image"), updateMenuItem); 

// DELETE - Remove an item
router.delete("/:id", protect, deleteMenuItem);

module.exports = router;