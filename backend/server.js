const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.route.js');
const path = require('path');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());  // To parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data (form submissions)
app.use(cors());  // Enable CORS for all routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB connection (without deprecated options)
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
app.use("/user", userRouter);
app.get('/', (req, res) => {
  res.send(`API is lives!${process.env.MONGODB_URL}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
