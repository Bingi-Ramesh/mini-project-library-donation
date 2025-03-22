const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableCount: {
      type: Number,
      required: true,
    },
    borrowedCount: {
      type: Number,
      default: 0, 
    },
    remainingCount: {
      type: Number,
      required: true,
    },
    coverPhoto: {
      type: String, 
      required: false, 
    },
  },
  {
    timestamps: true, 
  }
);


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
