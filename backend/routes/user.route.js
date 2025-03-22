const express = require('express');
const { registerStudent, signupStudent, getStudents } = require('../controllers/student.controller.js'); // Import the controller functions
const { registerStaff, signupStaff, getStaff } = require('../controllers/staff.controller.js');
const { registerAdmin, signupAdmin } = require('../controllers/admin.controller.js');
const { login } = require('../controllers/login.controller.js');
const { registerBook, getAllBooks } = require('../controllers/books.controller.js');
const router = express.Router();
const upload=require('../middleware/multer.js')

router.post('/register', registerStudent);
router.post('/verify-otp',signupStudent);
router.post('/register-staff',registerStaff)
router.post('/verify-otp-staff',signupStaff)
router.post('/register-admin',registerAdmin)
router.post('/verify-otp-admin',signupAdmin)
router.post('/login',login)
router.get('/get-staff',getStaff)
router.get('/get-students',getStudents)
router.get('/get-books',getAllBooks)
router.post('/register-books',upload.single('coverPhoto'), registerBook)
module.exports = router;
