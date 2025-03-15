const Student = require('../modals/student.modal.js'); // Import the Student model
const { createMail } = require('../mail.js'); // Import the createMail function
require('dotenv').config(); 
const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, Email, and Password are required!' });
    }

    // Check if student with the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'A student with this email already exists!' });
    }

    // Generate OTP
    const random6DigitNumber = Math.floor(100000 + Math.random() * 900000);

    // Create the email content
    const mail = createMail();
    mail.setTo(email);
    mail.setSubject('Email verification');
    mail.setText(`Your OTP to verify your email is ${random6DigitNumber}. Please do not share it with anyone.`);

    // Send email and handle possible errors
    try {
      await mail.send();
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return res.status(500).json({ error: 'Failed to send OTP. Please try again later.' });
    }

    // If email is sent successfully, respond with success
    res.status(200).json({
      message: 'OTP sent to the student successfully.',
      student: {
        otp: random6DigitNumber, // Returning the OTP in case the client needs it
      },
    });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res.status(500).json({ error: 'Error registering student', message: err.message });
  }
};

module.exports = { registerStudent };
