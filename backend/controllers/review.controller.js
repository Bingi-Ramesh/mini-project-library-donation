const Review = require('../modals/review.modal.js');

// Add a new review
const addReview = async (req, res) => {
  try {
    const { userName, bookId, message } = req.body;

    if (!userName || !bookId || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const review = new Review({
      userName,
      book: bookId,
      message,
    });

    await review.save();

    res.status(201).json({ success: true, message: 'Review submitted successfully', review });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all reviews for a specific book
const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.body;

    const reviews = await Review.find({ book: bookId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE REVIEW CONTROLLER
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = {
  addReview,
  getReviewsByBookId,
  deleteReview
};
