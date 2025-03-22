const Book = require('../modals/books.modal.js');
const path = require('path');

// Register a new book with image upload
const registerBook = async (req, res) => {
  try {
    const {
      title,
      author,
      year,
      genre,
      pages,
      description,
      availableCount,
      borrowedCount = 0,
      remainingCount,
    } = req.body;

    // Check if image is uploaded
    let coverPhoto = null;
    if (req.file) {
      // If image is uploaded, store the relative file path in MongoDB
      coverPhoto = '/uploads/' + req.file.filename; // Example of file path
    }

    // Validate required fields
    if (!title || !author || !year || !genre || !pages || !description || !availableCount || !remainingCount) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      year,
      genre,
      pages,
      description,
      availableCount,
      borrowedCount,
      remainingCount,
      coverPhoto,  // Save the image path
    });

    // Save the new book to the database
    await newBook.save();

    // Send success response
    res.status(201).json({
      message: 'Book registered successfully',
      book: newBook
    });
  } catch (error) {
    console.error('Error registering book:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const getAllBooks = async (req, res) => {
    try {
      // Fetch all books from the database
      const books = await Book.find();
  
      // If no books found, return a message
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books available' });
      }
  
      // Send the list of books as the response
      res.status(200).json({
        message: 'Books fetched successfully',
        books,
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

module.exports = { registerBook,getAllBooks };
