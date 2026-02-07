
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // Added
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true }, // Renamed from people
  requests: { type: String }, // Added
  createdAt: { type: Date, default: Date.now } // Good for tracking
});

module.exports = mongoose.model("Reservation", reservationSchema);