const express = require("express");
const cors = require("cors");
const path = require("path"); 
const app = express();

app.use(cors());
app.use(express.json());

// Serving the uploads folder so images appear on your frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes Configuration ---

// 1. Menu Management
app.use("/api/menu", require("./routes/menuRoutes"));

// 2. AI Assistant Logic
app.use("/api/ai", require("./routes/aiRoutes"));

// 3. Table Bookings
app.use("/api/reservations", require("./routes/reservationRoutes"));

// Customer orders and staff order queue
app.use("/api/orders", require("./routes/orderRoutes"));

// 4. Contact Inquiries (Ensure the file name is 'contactRoutes' or 'contact')
app.use('/api/contact', require("./routes/contact")); 

// 5. Admin Authentication (Matches our login logic)
app.use("/api/admin", require("./routes/adminRoutes"));

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Atelier Server is running smoothly" });
});

module.exports = app;
