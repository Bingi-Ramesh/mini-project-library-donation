const express = require('express');
const { registerStudent, signupStudent } = require('../controllers/student.controller.js'); // Import the controller functions
const { registerStaff, signupStaff } = require('../controllers/staff.controller.js');
const { registerAdmin, signupAdmin } = require('../controllers/admin.controller.js');
const { login } = require('../controllers/login.controller.js');
const router = express.Router();


router.post('/register', registerStudent);
router.post('/verify-otp',signupStudent);
router.post('/register-staff',registerStaff)
router.post('/verify-otp-staff',signupStaff)
router.post('/register-admin',registerAdmin)
router.post('/verify-otp-admin',signupAdmin)
router.post('/login',login)
module.exports = router;
