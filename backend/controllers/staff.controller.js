const Staff = require('../modals/staff.modal.js'); 
const { createMail } = require('../mail.js'); 
require('dotenv').config(); 
const registerStaff = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    console.log(name, email, password);

   
    if (!name || !email || !password ) {
      return res.status(400).json({ error: 'Name, Email, and Password are required!' });
    }

    
    const existingStaff= await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ error: 'A student with this email already exists!' });
    }

  
    const random6DigitNumber = Math.floor(100000 + Math.random() * 900000);

    
    const mail = createMail();
    mail.setTo(email);
    mail.setSubject('Email verification');
    mail.setText(` please check your details Name:${name},  Email:${email} Your OTP to verify your email is ${random6DigitNumber}. Please do not share it with anyone.`);

    
    try {
      await mail.send();
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return res.status(500).json({ error: 'Failed to send OTP. Please try again later.' });
    }

    
    res.status(200).json({
      message: 'OTP sent to the student successfully.',
      student: {
        name,
        email,
        password,
       
        otp: random6DigitNumber, 
      },
    });
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: 'Error registering student', message: err.message });
  }
};




const signupStaff = async (req, res) => {
  const { name, email, password,userType} = req.body;

  
 
  try {

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
  }

      // Check if user already exists
      const existingUser = await Staff.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new student with the provided hashed password
      const staff = new Staff({
          name,
          email,
          password, 
          userType
          // Directly store the hashed password from the frontend
      });

      // Save the student to the database
      await staff.save();

      // Respond with success
      res.status(201).json({
          message: 'User successfully registered',
          staff: {
              name: staff.name,
              email: staff.email,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
module.exports = { registerStaff,signupStaff};
