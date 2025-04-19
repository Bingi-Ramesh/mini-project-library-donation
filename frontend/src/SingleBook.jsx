import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const SingleBook = ({ book }) => {
  const API_URL = import.meta.env.VITE_API_BASE;
  const {
    title,
    author,
    year,
    genre,
    pages,
    description,
    availableCount,
    borrowedCount,
    remainingCount,
    coverPhoto,
    _id: bookId,
  } = book;

  const [errorMessage, setErrorMessage] = useState('');
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const isStudent = user && user.userType === 'student';

  const detailedDescription = `${title}, written by ${author}, is a ${genre} book published in ${year}. With ${pages} pages, it offers a comprehensive exploration of its subject matter. The book currently has ${availableCount} copies available for borrowing, with ${borrowedCount} copies already borrowed, leaving ${remainingCount} copies remaining. This book is an excellent choice for anyone interested in ${genre.toLowerCase()} literature. Here's a brief description: ${description}`;

  useEffect(() => {
    const fetchBorrowRequests = async () => {
      if (!isStudent) return;
      try {
        const res = await axios.get(`${API_URL}/user/borrow-requests/${user._id}`);
        const hasRequested = res.data.some(
          (req) => req.book._id === bookId && req.status === 'pending'
        );
        setAlreadyRequested(hasRequested);
      } catch (error) {
        console.error('Error checking borrow requests:', error);
      }
    };
    fetchBorrowRequests();
  }, [bookId, isStudent, user?._id]);

  const handleBorrow = async () => {
    if (alreadyRequested) {
      toast.error("You already requested this book. Wait for confirmation.");
      return;
    }
    if (remainingCount <= 0) {
      setErrorMessage('All books are borrowed, please wait for the return.');
      return;
    }

    try {
      await axios.post(`${API_URL}/user/register-borrow-request`, {
        studentId: user._id,
        bookId,
        lendingDays: 30,
        status: 'pending',
      });
      toast.success("Borrow Request submitted successfully");
      setAlreadyRequested(true);
      setErrorMessage('');
    } catch (error) {
      console.log(error)
      toast.error('Error submitting borrow request.');
      setErrorMessage('There was an error borrowing the book, please try again later.');
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.post(`${API_URL}/user/get-reviews`, { bookId });
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleReviewSubmit = async () => {
    if (!reviewMsg.trim()) return;

    try {
      await axios.post(`${API_URL}/user/add-review`, {
        userName: user.name,
        bookId,
        message: reviewMsg,
      });
      toast.success('Review submitted!');
      setReviewDialogOpen(false);
      setReviewMsg('');
      fetchReviews(); // refresh
    } catch (err) {
      toast.error('Failed to submit review.');
      console.error(err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.post(`${API_URL}/user/delete-review`, { reviewId });
      toast.success('Review deleted!');
      fetchReviews(); // refresh
    } catch (err) {
      toast.error('Failed to delete review.');
      console.error(err);
    }
  };

  return (
    <>
      {/* Book Info Panel */}
      <Paper sx={{ display: 'flex', padding: '20px', boxShadow: 3, height: '100vh', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2, marginRight: '20px', display: 'flex', alignItems: 'center' }}>
          <img
            src={coverPhoto ? `${API_URL}${coverPhoto}` : 'default-cover.jpg'}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {title}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>by {author}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Year:</strong> {year}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Genre:</strong> {genre}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Pages:</strong> {pages}</Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}><strong>Description:</strong> {description}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Available Count:</strong> {availableCount}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Borrowed Count:</strong> {borrowedCount}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Remaining Count:</strong> {remainingCount}</Typography>
          </div>

          <Typography variant="body1" sx={{ marginTop: '10px', textAlign: 'justify' }}>
            <strong>Book Overview:</strong> {detailedDescription}
          </Typography>

          {isStudent && (
            <>
              {remainingCount > 0 ? (
                <Button variant="contained" color="primary" onClick={handleBorrow} sx={{ mt: 1 }}>
                  Request Borrow
                </Button>
              ) : (
                <Typography variant="body1" sx={{ marginTop: '20px', color: 'red' }}>
                  All books are borrowed, please wait for the return.
                </Typography>
              )}
              <Button variant="outlined" color="secondary" sx={{ mt: 1}} onClick={() => setReviewDialogOpen(true)}>
                Leave a Review
              </Button>
            </>
            
          )}
    
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={6}
            fullWidth
            label="Your Review"
            variant="outlined"
            value={reviewMsg}
            onChange={(e) => setReviewMsg(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleReviewSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Reviews Section */}
      <Box sx={{ mt: 4, px: { xs: 1, sm: 2 }, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold',textAlign:'center', mb: 2 }}>📢 Reviews</Typography>
        {reviews.length > 0 ? (
          <>
            {(showAllReviews ? reviews : reviews.slice(0, 4)).map((r) => (
              <Paper key={r._id} sx={{ p: 2, mb: 2, width: '100%' }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="subtitle2" color="textSecondary">{r.userName}</Typography>
                  </Grid>
                  {!isStudent && (
                    <Grid item>
                      <Button size="small" color="error" onClick={() => handleDeleteReview(r._id)}>
                        Delete
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1">{r.message}</Typography>
              </Paper>
            ))}

            {reviews.length > 4 && (
              <Button  onClick={() => setShowAllReviews(!showAllReviews)} sx={{ mt: 1, }}>
                {showAllReviews ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No reviews yet. Be the first to review this book!
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SingleBook;
