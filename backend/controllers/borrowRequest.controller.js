const BorrowRequest = require('../modals/borrowRequest.modal.js');
const Student = require('../modals/student.modal.js');
const Book = require('../modals/books.modal.js');


// Create a new borrow request
const createBorrowRequest = async (req, res) => {
  try {
    const { studentId, bookId, lendingDays, status } = req.body;

    // Optional: validate existence of student and book
    const student = await Student.findById(studentId);
    const book = await Book.findById(bookId);

    if (!student || !book) {
      return res.status(404).json({ message: 'Student or Book not found' });
    }

    const newRequest = new BorrowRequest({
      student: studentId,
      book: bookId,
      lendingDays: lendingDays || 30,
      status: status || 'pending',
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating borrow request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all borrow requests (optionally you can later filter by student or status)
const getAllBorrowRequests = async (req, res) => {
    try {
      const requests = await BorrowRequest.find()
        .populate('student') // sends the full student object
        .populate('book');   // sends the full book object
  
      res.status(200).json(requests);
    } catch (error) {
      console.error('Error fetching borrow requests:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  
  const acceptBorrowRequest = async (req, res) => {
    const { borrowRequestId } = req.body;
  
    try {
      // Find the borrow request by ID
      const borrowRequest = await BorrowRequest.findById(borrowRequestId);
      if (!borrowRequest) {
        return res.status(404).json({ message: 'Borrow request not found' });
      }
  
      // Check if the borrow request is already accepted (status = borrowed)
      if (borrowRequest.status === 'borrowed') {
        return res.status(400).json({ message: 'This request has already been borrowed' });
      }
  
      // Fetch the associated book using the borrowRequest.book._id
      const book = await Book.findById(borrowRequest.book);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Check if there are available copies of the book
      if (book.availableCount <= 0) {
        return res.status(400).json({ message: 'No copies available for borrowing' });
      }
  
      // Change the status of the borrow request to 'borrowed'
      borrowRequest.status = 'borrowed';
      await borrowRequest.save();
  
      // Reduce the available count of the book by 1
     // book.availableCount -= 1;
     book.remainingCount -=1
     book.borrowedCount +=1
      await book.save();
  
      return res.status(200).json({ message: 'Borrow request accepted and book status updated' });
  
    } catch (error) {
      console.error('Error accepting borrow request:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

 

const cancelBorrowRequest = async (req, res) => {
  const { borrowRequestId } = req.body;

  try {
    // Find the borrow request by ID
    const borrowRequest = await BorrowRequest.findById(borrowRequestId);
    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    // Delete the borrow request
    await BorrowRequest.findByIdAndDelete(borrowRequestId);

    return res.status(200).json({ message: 'Borrow request canceled' });

  } catch (error) {
    console.error('Error canceling borrow request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createRenewalRequest = async (req, res) => {
  try {
    const { borrowRequestId, status, renewalDays } = req.body;

    // Check if the borrow request exists
    const borrowRequest = await BorrowRequest.findById(borrowRequestId);
    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    // Update the fields if provided
    if (status) borrowRequest.status = status;
    if (renewalDays !== undefined) borrowRequest.renewalDays = renewalDays;

    const updatedRequest = await borrowRequest.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating borrow request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const handleRenewal = async (req, res) => {
  try {
    const { borrowRequestId, status } = req.body;

    // Check if the borrow request exists
    const borrowRequest = await BorrowRequest.findById(borrowRequestId);
    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    // Update the fields if provided
    if (status) borrowRequest.status = status;
   

    const updatedRequest = await borrowRequest.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating borrow request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createBorrowRequest,
  getAllBorrowRequests,
  acceptBorrowRequest,
  cancelBorrowRequest,
  createRenewalRequest,
  handleRenewal
};
