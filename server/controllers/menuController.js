const MenuItem = require("../models/MenuItems");
const fs = require("fs");
const path = require("path");

const parseList = (value) => {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(item => String(item).trim()).filter(Boolean);
  } catch { /* Admin forms also support comma/newline separated values. */ }
  return value.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
};
const parseBoolean = (value, fallback = false) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return fallback;
};
const structuredFields = (body, existing = {}) => ({
  ingredients: parseList(body.ingredients ?? existing.ingredients),
  allergens: parseList(body.allergens ?? existing.allergens),
  dietaryTags: parseList(body.dietaryTags ?? existing.dietaryTags),
  flavorNotes: parseList(body.flavorNotes ?? existing.flavorNotes),
  caffeineLevel: body.caffeineLevel ?? existing.caffeineLevel ?? "unknown",
  crossContactNotes: body.crossContactNotes ?? existing.crossContactNotes ?? "",
  ingredientInfoComplete: parseBoolean(body.ingredientInfoComplete, existing.ingredientInfoComplete ?? false)
});

// --- EXISTING FUNCTIONS ---

const getAllMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    // Removed isAvailable: true filter for Admin fetch so they can see hidden items
    let filter = {}; 
    
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    // UPDATED: Added .sort({ updatedAt: -1 }) to show latest/modified items first
    const menuItems = await MenuItem.find(filter).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch menu items" });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch menu item" });
  }
};

// --- ADMIN FUNCTIONS ---

const createMenuItem = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newItem = await MenuItem.create({
      name,
      price,
      category,
      description,
      ...structuredFields(req.body),
      image: imagePath,
      isAvailable: true 
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { name, price, category, description, isAvailable } = req.body;
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    let updateData = { name, price, category, description, isAvailable, ...structuredFields(req.body, item) };

    if (req.file) {
      if (item.image) {
        const oldPath = path.join(__dirname, "..", item.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (item.image) {
      const fullPath = path.join(__dirname, "..", item.image); 
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await item.deleteOne();
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { 
    getAllMenuItems, 
    getMenuItemById, 
    createMenuItem, 
    updateMenuItem, 
    deleteMenuItem 
};
