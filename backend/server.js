// backend/server.js

require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());              // Enable CORS
app.use(express.json());      // Parse incoming JSON requests


  
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Backend!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
