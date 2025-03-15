const express = require('express');
const { registerStudent } = require('../controllers/student.controller.js'); // Import the controller functions
const router = express.Router();


router.post('/register', registerStudent);

module.exports = router;
