const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); 
const { 
    createReservation, 
    getReservations,
    deleteReservation,
    updateReservationStatus
} = require("../controllers/reservationController");

// PUBLIC ROUTE
router.post('/', createReservation);

// ADMIN ROUTES
// Get all reservations
router.get('/', protect, getReservations);

// Update status
router.patch('/:id/status', protect, updateReservationStatus);

// Delete reservation
router.delete('/:id', protect, deleteReservation); 

module.exports = router;