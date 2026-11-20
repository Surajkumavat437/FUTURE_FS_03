const Contact = require("../models/Contact");

// @desc    Submit a contact form (Public)
exports.submitContact = async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "Message sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// @desc    Get all messages (Admin Only)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};