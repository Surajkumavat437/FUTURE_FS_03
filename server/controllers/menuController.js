const MenuItem = require("../models/MenuItems");

const getAllMenuItems = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = { isAvailable: true };

    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    const menuItems = await MenuItem.find(filter);

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
    });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem || !menuItem.isAvailable) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("Error fetching menu item:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
    });
  }
};

module.exports = { getAllMenuItems, getMenuItemById };
