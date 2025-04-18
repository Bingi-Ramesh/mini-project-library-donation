const Student = require('../modals/student.modal.js'); // Import the Student model
const { createMail } = require('../mail.js'); // Import the createMail function
require('dotenv').config(); 
const registerStudent = async (req, res) => {
  try {
    const { name, email, password,id} = req.body;
    console.log(name, email, password);

   
    if (!name || !email || !password || !id) {
      return res.status(200).json({ error: 'Name, Email, and Password,id all are required!' });
    }

    // Check if student with the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(200).json({ error: 'A student with this email already exists!' });
    }

    // Generate OTP
    const random6DigitNumber = Math.floor(100000 + Math.random() * 900000);

    // Create the email content
    const mail = createMail();
    mail.setTo(email);
    mail.setSubject('Email verification');
    mail.setText(`please check your details Name:${name}, ID:${id} Email:${email} Your OTP to verify your email is ${random6DigitNumber}. Please do not share it with anyone.`);

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
        name,
        email,
        password,
        id,
        otp: random6DigitNumber, // Returning the OTP in case the client needs it
      },
    });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res.status(500).json({ error: 'Error registering student', message: err.message });
  }
};




const signupStudent = async (req, res) => {
  const { name, email, password,id ,userType} = req.body;

  // Validate input fields
 
  try {

    if (!name || !email || !password || !id || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
  }

      // Check if user already exists
      const existingUser = await Student.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new student with the provided hashed password
      const student = new Student({
          name,
          email,
          password, 
          userType,
          id, // Directly store the hashed password from the frontend
      });

      // Save the student to the database
      await student.save();

      // Respond with success
      res.status(201).json({
          message: 'User successfully registered',
          student: {
              name: student.name,
              email: student.email,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};


const getStudents = async (req, res) => {
  try {
   
    const students = await Student.find();  

   
    if (!students || students.length === 0) {
      return res.status(200).json({ message: "No Students members found" });
    }

   
    return res.status(200).json(students);
    
  } catch (error) {
   
    console.error(error);
    return res.status(200).json({ message: "Internal server error..." });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = req.body;
    const studentId=student._id

    // Check if student exists
    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete the student
    await Student.findByIdAndDelete(studentId);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student', message: error.message });
  }
};

module.exports = { registerStudent,signupStudent,getStudents,deleteStudent};
