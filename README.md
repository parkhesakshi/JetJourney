# Flight Booking System

A Node.js-based flight booking system with CRUD operations, real-time updates using Socket.io, and email notifications with PDF attachments using SendGrid.

## Project Setup

### Prerequisites

- Node.js
- MongoDB
- SendGrid account for sending emails

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/parkhesakshi/JetJourney.git
   cd flight-booking-system

2. Install dependencies:
   ```sh
   npm install pnpm
   pnpm install

3. Set up environment variables:
Create a .env file in the root directory and add your SendGrid API key:
   ```sh
    SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY

4. Start MongoDB:
Make sure your MongoDB server is running. You can start MongoDB using:
   ```sh
    mongod

5. Basic Server Setup
Running the Server
Start the server:
   ```sh
    npm start

### Usage
Use Postman or a similar tool to interact with the API endpoints. You can also use a web browser or multiple clients to test real-time updates.

### API Endpoints
## Create Booking
   * URL: `/bookings`
   * Method: `POST`
   * Request Body:
     ```sh
        {
    "flightNumber": "FL123",
    "passengerName": "John Doe",
    "departureDate": "2024-07-20T10:00:00.000Z",
    "seatNumber": "12A" 
         }

   * Response:
     ```sh
        {
    "id": "60f7c1ae2e684a5a30d8b8e1",
    "flightNumber": "FL123",
    "passengerName": "John Doe",
    "departureDate": "2024-07-20T10:00:00.000Z",
    "seatNumber": "12A" 
         }

## Read All Bookings
   * URL: `/bookings`
   * Method: `GET`
   * Response:
     ```sh
        [
          {
        "id": "60f7c1ae2e684a5a30d8b8e1",
        "flightNumber": "FL123",
        "passengerName": "John Doe",
        "departureDate": "2024-07-20T10:00:00.000Z",
        "seatNumber": "12A"
          },
          ...
       ]

## Update Booking
   * URL: `/bookings/:id`
   * Method: `PUT`
   * Request Body:
     ```sh
        {
    "flightNumber": "FL124",
    "passengerName": "Jane Doe",
    "departureDate": "2024-07-21T10:00:00.000Z",
    "seatNumber": "14B"
        }

   * Response:
     ```sh
        {
    "id": "60f7c1ae2e684a5a30d8b8e1",
    "flightNumber": "FL124",
    "passengerName": "Jane Doe",
    "departureDate": "2024-07-21T10:00:00.000Z",
    "seatNumber": "14B"
        }

## Delete a Booking
   * URL: `/bookings/:id`
   * Method: `DELETE`
   * Response: `204 No Content`

### Real-Time Updates
Real-time updates are implemented using Socket.io. The server emits events to connected clients when a booking is created, updated, or deleted. Clients can listen for the following events:
   * `bookingCreated`
   * `bookingUpdated`
   * `bookingDeleted`

### Email Notification
When a new booking is created, an email confirmation with a PDF attachment containing the booking details is sent using SendGrid.

## Email Configuration
To configure email notifications, set the `SENDGRID_API_KEY` environment variable in the `.env` file.
   

