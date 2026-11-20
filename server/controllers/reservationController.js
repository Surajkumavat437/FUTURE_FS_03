const Reservation = require("../models/Reservation");

// @desc    Create new reservation (Public)
// @route   POST /api/reservations
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
      error: error.message
    });
  }
};

// @desc    Get all reservations (Admin Only)
// @route   GET /api/reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
    });
  }
};

// @desc    Delete a reservation (Admin Only)
// @route   DELETE /api/reservations/:id
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete reservation",
      error: error.message
    });
  }
};

// @desc    Update reservation status (Admin Only)
// @route   PATCH /api/reservations/:id/status
const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }

    res.status(200).json({
      success: true,
      message: `Reservation ${status} successfully`,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update reservation status",
      error: error.message
    });
  }
};

// Update the exports to include updateReservationStatus
module.exports = { 
    createReservation, 
    getReservations,
    deleteReservation,
    updateReservationStatus 
};