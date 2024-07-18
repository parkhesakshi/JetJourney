const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailConfirmation = async (booking, pdfBuffer) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: "sender@example.com",
    to: "recipient@example.com",
    subject: "Flight Booking Confirmation",
    text: `Your booking is confirmed. Details: ${JSON.stringify(booking)}`,
    html: `<strong>Your booking is confirmed. Details:</strong><br>${JSON.stringify(
      booking,
      null,
      2
    )}`,
    attachments: [
      {
        filename: "booking.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailConfirmation };
