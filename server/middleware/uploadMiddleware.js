const multer = require("multer");
const path = require("path");

// 1. Storage Engine Logic: Where to save and how to name the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure you have a folder named 'uploads' in your server root
  },
  filename: (req, file, cb) => {
    // Saves file as: timestamp-filename.extension (e.g., 1710435-latte.jpg)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// 2. Filter Logic: Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (isMatch) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"), false);
  }
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit to 5MB
});

module.exports = upload;