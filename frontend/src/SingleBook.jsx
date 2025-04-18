import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import axios from 'axios';

const SingleBook = ({ book }) => {
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
  } = book;

  const [errorMessage, setErrorMessage] = useState('');
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const isStudent = user && user.userType === 'student';

  const detailedDescription = `${title}, written by ${author}, is a ${genre} book published in ${year}. With ${pages} pages, it offers a comprehensive exploration of its subject matter. The book currently has ${availableCount} copies available for borrowing, with ${borrowedCount} copies already borrowed, leaving ${remainingCount} copies remaining. This book is an excellent choice for anyone interested in ${genre.toLowerCase()} literature. Here's a brief description: ${description}`;

  // Check if the student has already requested this book
  useEffect(() => {
    const fetchBorrowRequests = async () => {
      if (!isStudent) return;

      try {
        const response = await axios.get(`http://localhost:5000/user/borrow-requests/${user._id}`);
        const hasRequested = response.data.some(
          (req) => req.book._id === book._id && req.status === 'pending'
        );
        setAlreadyRequested(hasRequested);
      } catch (error) {
        console.error('Error checking borrow requests:', error);
      }
    };

    fetchBorrowRequests();
  }, [book._id, isStudent, user?._id]);

  const handleBorrow = async () => {
    if (alreadyRequested) {
      alert('You’ve already requested this book.');
      return;
    }

    if (remainingCount <= 0) {
      setErrorMessage('All books are borrowed, please wait for the return.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/register-borrow-request', {
        studentId: user._id,
        bookId: book._id,
        lendingDays: 30,
        status: 'pending',
      });

      console.log('Borrow request submitted:', response.data);
      alert('Borrow request submitted successfully!');
      setAlreadyRequested(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error borrowing the book:', error);
      setErrorMessage('There was an error borrowing the book, please try again later.');
    }
  };

  return (
    <Paper sx={{ display: 'flex', padding: '20px', boxShadow: 3, height: '100vh' }}>
      <Box sx={{ flex: 2, marginRight: '20px', display: 'flex', alignItems: 'center' }}>
        <img
          src={coverPhoto ? `http://localhost:5000${coverPhoto}` : 'default-cover.jpg'}
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
          <Typography variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
            by {author}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Year:</strong> {year}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Genre:</strong> {genre}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Pages:</strong> {pages}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '10px' }}>
            <strong>Description:</strong> {description}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Available Count:</strong> {availableCount}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Borrowed Count:</strong> {borrowedCount}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Remaining Count:</strong> {remainingCount}
          </Typography>
        </div>

        <Typography variant="body1" sx={{ marginTop: '10px', textAlign: 'justify' }}>
          <strong>Book Overview:</strong> {detailedDescription}
        </Typography>

        {isStudent && (
          remainingCount > 0 ? (
            <Button variant="contained" color="primary" onClick={handleBorrow}>
              Request Borrow
            </Button>
          ) : (
            <Typography variant="body1" sx={{ marginTop: '20px', color: 'red' }}>
              All books are borrowed, please wait for the return.
            </Typography>
          )
        )}

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default SingleBook;
