const Booking = require('../model/booking');
const { sendEmailConfirmation } = require('../utils/email');
const { generatePDF } = require('../utils/pdf');
const socket = require('../config/socket-io');
const createBooking = async (req, res) => {
  const { flightNumber, passengerName, departureDate, seatNumber } = req.body;
  try {
    const booking = new Booking({
      flightNumber,
      passengerName,
      departureDate: new Date(departureDate),
      seatNumber,
    });
    await booking.save();
    const io = socket.getInstance();
    io.emit('bookingCreated', booking);
    const pdfBuffer = await generatePDF(booking);
    await sendEmailConfirmation(booking, pdfBuffer);
    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { flightNumber, passengerName, departureDate, seatNumber } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { flightNumber, passengerName, departureDate, seatNumber },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const io = socket.getInstance();
    io.emit('bookingUpdated', booking);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const io = socket.getInstance();
    io.emit('bookingDeleted', booking);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
