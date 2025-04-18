const BookRequest = require('../modals/bookRequest.modal.js');

// Function to submit a new book request
const createBookRequest = async (req, res) => {
  try {
    const { title, author, genre, additionalNotes,requestedBy,name } = req.body;

 

    const newRequest = new BookRequest({
      title,
      author,
      genre,
      additionalNotes,
      requestedBy,
      name,
      status:"pending"
    });

    await newRequest.save();

    res.status(201).json({ success: true, message: 'Book request submitted successfully.' });
  } catch (error) {
    console.error('Error submitting book request:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting request.' });
  }
};

// Function to get all book requests
const getAllBookRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find().sort({ requestedAt: -1 });

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error('Error fetching book requests:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching requests.' });
  }
};

// Function to delete a book request
const deleteBookRequest = async (req, res) => {
    try {
      const { requestId } = req.body;
  
      // Check if the requestId is valid
      if (!requestId) {
        return res.status(400).json({ success: false, message: 'Request ID is required.' });
      }
  
      // Find the book request by ID and delete it
      const deletedRequest = await BookRequest.findByIdAndDelete(requestId);
  
      if (!deletedRequest) {
        return res.status(404).json({ success: false, message: 'Book request not found.' });
      }
  
      res.status(200).json({ success: true, message: 'Book request deleted successfully.' });
    } catch (error) {
      console.error('Error deleting book request:', error);
      res.status(500).json({ success: false, message: 'Server error while deleting request.' });
    }
  };

  const updateBookRequestStatus = async (req, res) => {
    try {
      const { requestId, status } = req.body;
  
      if (!requestId || !status) {
        return res.status(400).json({ success: false, message: 'Request ID and status are required.' });
      }
  
      const updatedRequest = await BookRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ success: false, message: 'Book request not found.' });
      }
  
      res.status(200).json({ success: true, message: 'Status updated successfully.', data: updatedRequest });
    } catch (error) {
      console.error('Error updating book request status:', error);
      res.status(500).json({ success: false, message: 'Server error while updating status.' });
    }
  };
  
  
// Manually exporting the functions to module.exports
module.exports = {
  createBookRequest,
  getAllBookRequests,
  deleteBookRequest,
  updateBookRequestStatus
};
