const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use('/api/contact', require("./routes/contact"));


app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

module.exports = app;
