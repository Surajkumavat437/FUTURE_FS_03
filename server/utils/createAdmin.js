const mongoose = require("mongoose");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: "admin@cafe.com" });
    if (adminExists) {
      console.log("Admin already exists!");
      process.exit();
    }

    const admin = new User({
      name: "Admin User",
      email: "admin@cafe.com",
      password: "admin123", // This will be hashed automatically by our Model
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();