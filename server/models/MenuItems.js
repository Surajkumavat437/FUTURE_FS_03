const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Fixed typo here
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    // ADD THIS FIELD - This allows the image URL to pass through
    image: {
        type: String,
        trim: true,
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("MenuItem", menuItemSchema);