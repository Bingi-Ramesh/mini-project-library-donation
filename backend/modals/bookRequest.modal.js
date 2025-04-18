// models/BookRequest.js
const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  status:{
    type:String,
    default:"pending"
  },
  additionalNotes: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false, // optional if you're not tying it to a user
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);
