const Admin = require('../modals/admin.modal.js'); 
const { createMail } = require('../mail.js'); 
require('dotenv').config(); 
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    console.log(name, email, password);

   
    if (!name || !email || !password ) {
      return res.status(400).json({ error: 'Name, Email, and Password are required!' });
    }

    
    const existingAdmin= await Admin.findOne({ email });
    if (existingAdmin) {
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
       
        otp: random6DigitNumber, 
      },
    });
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: 'Error registering Admin', message: err.message });
  }
};




const signupAdmin = async (req, res) => {
  const { name, email, password,userType} = req.body;

  // Validate input fields
 
  try {

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
  }

      // Check if user already exists
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new student with the provided hashed password
      const admin = new Admin({
          name,
          email,
          password, 
          userType
          // Directly store the hashed password from the frontend
      });

      // Save the student to the database
      await admin.save();

      // Respond with success
      res.status(201).json({
          message: 'User successfully registered',
          admin: {
              name: admin.name,
              email: admin.email,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
module.exports = { registerAdmin,signupAdmin};
