const Staff = require('../modals/staff.modal.js');
const Student = require('../modals/student.modal.js'); 
const Admin=require('../modals/admin.modal.js')
const jwt = require('jsonwebtoken'); // JSON Web Token for generating the token

// Controller function for logging in a student
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    
    const student = await Student.findOne({ email });
    const staff = await Staff.findOne({ email });
    const admin = await Admin.findOne({ email });
    if (!student &&  !staff && !admin)  {
      return res.status(404).json({ message: 'user  not found with this credentials' });
    }
let token=""
    if(student!=null){
        const isMatch = await student.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
         token = jwt.sign({ id: student._id, email: student.email, userType: student.userType }, 'your_jwt_secret_key', { expiresIn: '1h' });

    }

    if(staff!=null){
        const isMatch = await staff.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
           token = jwt.sign({ id: staff._id, email: staff.email, userType: Staff.userType }, 'your_jwt_secret_key', { expiresIn: '1h' });

    }

    if(admin!=null){
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
           token = jwt.sign({ id: admin._id, email: admin.email, userType: admin.userType }, 'your_jwt_secret_key', { expiresIn: '1h' });

    }
   
let user=""
if(student!=null) user=student 
if(staff!=null) user=staff 
if(admin!=null) user=admin 
    
   

   
   

    
    res.status(200).json({
      message: 'Login successful',
      token,  
        user,
    });

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
};
