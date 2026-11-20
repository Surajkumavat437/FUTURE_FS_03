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
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    dietaryTags: { type: [String], default: [] },
    flavorNotes: { type: [String], default: [] },
    caffeineLevel: { type: String, enum: ["none", "low", "moderate", "high", "unknown"], default: "unknown" },
    crossContactNotes: { type: String, trim: true, default: "" },
    ingredientInfoComplete: { type: Boolean, default: false },
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
