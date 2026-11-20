const Contact = require("../models/Contact");

// @desc    Submit contact form (Public)
const createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).json({
            success: true,
            data: newContact,
        });
    } catch (error) {
        res.status(500).json({
            success: false, // Fixed typo here
            message: error.message,
        });
    }
};

// @desc    Get all contact messages (Admin Only)
// 🆕 Added this function so your route doesn't crash
const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 🆕 Export BOTH functions so the router can find them
const deleteMessage = async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ success: false, message: "Contact message not found" });
        }
        return res.status(200).json({ success: true, message: "Contact message deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createContact, getMessages, deleteMessage };
