const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  flightNumber: String,
  passengerName: String,
  departureDate: Date,
  seatNumber: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
