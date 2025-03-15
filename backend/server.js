const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.route.js');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());  // To parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data (form submissions)
app.use(cors());  // Enable CORS for all routes

// MongoDB connection (without deprecated options)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
app.use("/user", userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
