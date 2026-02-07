const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
    });
  }
};

module.exports = { createReservation };
