// backend/seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing users (optional - be careful!)
    await User.deleteMany();

    // 2. Create your admin account
    await User.create({
      name: "Suraj Kumavat",
      email: "admin@gmail.com", // Change this to your preferred email
      password: "admin123",       // The model will automatically hash this
      role: "admin"
    });

    console.log("✅ Admin User Created Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();