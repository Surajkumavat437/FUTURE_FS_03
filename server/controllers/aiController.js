const axios = require("axios");
const MenuItem = require("../models/MenuItems");
const path = require("path");
require("dotenv").config({path:path.resolve(__dirname,"../.env")});

const HF_MODEL = process.env.HF_MODEL_NAME; 
const ROUTER_URL = process.env.AI_URL;

const getMenuRecommendation = async (req, res) => {
  try {
    // We expect 'message' to be an array of objects: [{role, content}, ...]
    const { message } = req.body;

    if (!message || (Array.isArray(message) && message.length === 0)) {
      return res.status(400).json({ success: false, message: "Conversation history is required" });
    }

    // Ensure we handle both single strings (legacy) and arrays (new)
    const history = Array.isArray(message) ? message : [{ role: "user", content: message }];

    // Fetch live menu
    const menuItems = await MenuItem.find({ isAvailable: true }).select("name price category");
    const menuText = menuItems
      .map(item => `${item.name} (${item.category}) - ₹${item.price}`)
      .join(", ");

    // Sophisticated System Prompt
    const systemInstruction = {
      role: "system",
      content: `You are the Digital Concierge for 'Atelier Cozy'. 
      Our Menu: ${menuText}.
      
      CRITICAL RULES:
      1. Use the conversation history to understand context. If the user asks for a recommendation after you listed desserts, you MUST suggest one of those desserts.
      2. Never suggest a main course (like Pasta) if the current topic is desserts.
      3. Maintain a sophisticated, helpful tone. 
      4. If the user asks for a recommendation, pick ONE item and explain why based on flavor, not just price.
      5. Keep responses short (max 2-3 sentences).`
    };

    const response = await axios.post(
      ROUTER_URL,
      {
        model: HF_MODEL,
        messages: [systemInstruction, ...history], // History is injected here
        max_tokens: 150,
        temperature: 0.5 // Lower temperature for more consistent logic
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    const cleanReply = response.data.choices[0].message.content.trim();

    res.status(200).json({
      success: true,
      reply: cleanReply
    });

  } catch (error) {
    console.error("AI Controller Error:", error.message);
    res.status(500).json({
      success: false,
      message: "The Concierge is currently unavailable.",
    });
  }
};

module.exports = { getMenuRecommendation };