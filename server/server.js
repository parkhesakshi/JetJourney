const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

require('./config/socket-io').initialize(server);

const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/bookings', bookingRoutes);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// module.exports = { io };
