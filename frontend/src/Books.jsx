import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Card, CardContent, Input, Box } from '@mui/material';
import axios from 'axios';
import SingleBook from './SingleBook';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const Books = () => {
  const [bookRequests, setBookRequests] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    pages: '',
    description: '',
    availableCount: '',
    borrowedCount: '',  
    remainingCount: '', 
    coverPhoto: null,   
  });
  
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);  // To store filtered books
  const [isAdmin, setIsAdmin] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
 let user = JSON.parse(localStorage.getItem('user'));
    const isStudent = user && user.userType === 'student'
  useEffect(() => {
    // Check if user is admin from localStorage
     user = JSON.parse(localStorage.getItem('user'));
   
    if (user && user.userType === 'admin') {
      setIsAdmin(true);
    }

    // Fetch books from the backend
    fetchBooks();
  }, []);
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/get-books'); // Replace with your actual API
      console.log(response.data);
      setBooks(response.data.books);
      setFilteredBooks(response.data.books);  // Initially set filtered books to all books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  const fetchBookRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/get-all-book-requests'); // Replace with the actual API endpoint for book requests
      setBookRequests(response.data.requests);  // Assuming the backend response has a "requests" array
    } catch (error) {
      console.error('Error fetching book requests:', error);
    }
  };
  useEffect(() => {
    // Check if user is admin or staff
    user = JSON.parse(localStorage.getItem('user'));
    if (user && (user.userType === 'admin' || user.userType === 'staff')) {
      fetchBookRequests();
    }
  }, []);
  const handleRemoveBook = async (bookId) => {
    try {
      await axios.post('http://localhost:5000/user/delete-book', { bookId });
toast.success("Book removed successfully.")
   //   alert('Book removed successfully.');
      // Optionally refresh your book list here
    } catch (error) {
      console.error('Error removing book:', error);
     // alert('Failed to remove book. Please try again.');
     toast.error("Error removing book")
    }
  };
  
  // Search filter function
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter books based on title or genre matching the search term
    const filtered = books.filter((book) => 
      book.title.toLowerCase().includes(term.toLowerCase()) || 
      book.genre.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredBooks(filtered);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBookDetails((prevState) => ({
      ...prevState,
      coverPhoto: file,
    }));

    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [requestDetails, setRequestDetails] = useState({
    title: '',
    author: '',
    genre: '',
    additionalNotes: '',
  });
  
  const handleRequestDialogOpen = () => {
    setOpenRequestDialog(true);
  };
  
  const handleRequestDialogClose = () => {
    setOpenRequestDialog(false);
  };
  
  const handleRequestInputChange = (e) => {
    const { name, value } = e.target;
    setRequestDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRequestSubmit = async () => {
    try {
      requestDetails.requestedBy=user._id
      requestDetails.name=user.name
      console.log(requestDetails)
      await axios.post('http://localhost:5000/user/register-book-request', requestDetails);
     // alert('Your request has been submitted to the staff.');
     toast.success("Your request has been submitted to the staff.")
      setRequestDetails({
        title: '',
        author: '',
        genre: '',
        additionalNotes: '',
      });
      setOpenRequestDialog(false);
    } catch (error) {
      console.error('Error submitting request:', error);
     // alert('Failed to submit your request. Please try again.');
      toast.error("Failed to submit your request. Please try again.")
    }
  };
  const renderBookRequestsTable = () => {
  
  
    const handlePostToPublic = async (requestId) => {
      const request = bookRequests.find(r => r._id === requestId);
      if (!request) return;
  
      const data = {
        title: request.title,
        author: request.author,
        genre: request.genre,
        requestedBy: request.requestedBy,
      };
  
      try {
        await axios.post('http://localhost:5000/user/post-to-public', data);
  
        // New backend call to update status
        await axios.post('http://localhost:5000/user/update-book-request-status', {
          requestId,
          status: 'posted',
        });
  toast.success("Book request has been posted to the public.")
       // alert('Book request has been posted to the public.');
        // You might want to update local state here to reflect change
      } catch (error) {
        console.error('Error posting to public:', error);
       // alert('Failed to post request. Please try again.');
       toast.error("Failed to post request. Please try again.")
      }
    };
  
    const handleCancelRequest = async (requestId) => {
      try {
        await axios.post('http://localhost:5000/user/cancel-book-request', { requestId });
       // alert('Book request has been cancelled.');
       toast.success("Book request has been cancelled.")
        // You might want to update local state here too
      } catch (error) {
        console.error('Error cancelling request:', error);
       // alert('Failed to cancel the request. Please try again.');
       toast.error("Failed to cancel the request. Please try again.")
      }
    };
  
    const pendingRequests = bookRequests.filter(req => req.status === 'pending');
    const displayedRequests = showAll ? pendingRequests : pendingRequests.slice(0, 4);
  
    return (
      <>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Book Requests from Students
          </Typography>
        </Box>
  
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>S.No</b></TableCell>
                <TableCell><b>Book Name</b></TableCell>
                <TableCell><b>Author</b></TableCell>
                <TableCell><b>Genre</b></TableCell>
                <TableCell><b>Requested By</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No pending book requests.
                  </TableCell>
                </TableRow>
              ) : (
                displayedRequests.map((request, index) => (
                  <TableRow key={request._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.author}</TableCell>
                    <TableCell>{request.genre}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ marginRight: '10px' }}
                        onClick={() => handlePostToPublic(request._id)}
                      >
                        Post to Public
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleCancelRequest(request._id)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Show More / Show Less Toggle */}
        {pendingRequests.length > 4 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="text" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'Show More'}
            </Button>
          </Box>
        )}
      </>
    );
  };
  
  
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', bookDetails.title);
    formData.append('author', bookDetails.author);
    formData.append('year', bookDetails.year);
    formData.append('genre', bookDetails.genre);
    formData.append('pages', bookDetails.pages);
    formData.append('description', bookDetails.description);
    formData.append('availableCount', bookDetails.availableCount);
    formData.append('borrowedCount', bookDetails.borrowedCount);
    formData.append('remainingCount', bookDetails.remainingCount);
    if (bookDetails.coverPhoto) {
      formData.append('coverPhoto', bookDetails.coverPhoto);
    }

    try {
      await axios.post('http://localhost:5000/user/register-books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchBooks(); // Refresh the books list
      handleDialogClose(); // Close the dialog
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error("error adding book try again...")
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Books
      </Typography>

      {/* Search Field */}
      {!selectedBook? <TextField
        label="Search by Title or Genre"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px' }}
      /> :null}
     

      {/* Conditionally render Add Books button if the user is an admin */}
      {isAdmin && !selectedBook && (
        <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
          Add Book
        </Button>
      )}
{isStudent && filteredBooks.length === 0 && (
  <Button
    variant="contained"
    color="primary"
    onClick={handleRequestDialogOpen}
    fullWidth
    style={{ marginTop: '20px' }}
  >
    Inform Staff
  </Button>
)}

      {/* Display books or a message if no books are available */}
      <Grid container spacing={4} marginTop={2}>
      {selectedBook ? (
        <SingleBook book={selectedBook} />  
      ) : (
        <Grid container spacing={4} marginTop={2}>
           {!isStudent && renderBookRequestsTable()}
          {filteredBooks.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center" style={{ width: '100%' }}>
              No books found matching your search.
            </Typography>
          ) : (
            filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleBookClick(book)}
                >
                  <CardContent>
                    {book.coverPhoto && (
                      <img
                        src={`http://localhost:5000${book.coverPhoto}`}
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '250px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginBottom: '15px',
                        }}
                      />
                    )}
                    <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
                      {book.title}
                    </Typography>
                    <Typography variant="body2"><b>Author:</b> {book.author}</Typography>
                    <Typography variant="body2"><b>Genre:</b> {book.genre}</Typography>
                    <Typography variant="body2"><b>Published year:</b> {book.year}</Typography>
                    <Typography variant="body2"><b>Pages:</b> {book.pages}</Typography>
            
                    {/* Show Remove button if user is not a student */}
                    {!isStudent && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering handleBookClick
                          handleRemoveBook(book._id);
                        }}
                      >
                        Remove Book
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
            
          )}
        </Grid>
      )}
      </Grid>
      <Dialog open={openRequestDialog} onClose={handleRequestDialogClose}>
  <DialogTitle>Request a Book</DialogTitle>
  <DialogContent>
    <TextField
      label="Book Title"
      name="title"
      value={requestDetails.title}
      onChange={handleRequestInputChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Author"
      name="author"
      value={requestDetails.author}
      onChange={handleRequestInputChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Genre"
      name="genre"
      value={requestDetails.genre}
      onChange={handleRequestInputChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Additional Notes"
      name="additionalNotes"
      value={requestDetails.additionalNotes}
      onChange={handleRequestInputChange}
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleRequestDialogClose} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleRequestSubmit} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>

      {/* Dialog to add a book */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* First Column - Left Side */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                name="title"
                value={bookDetails.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Author"
                name="author"
                value={bookDetails.author}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Year of Publish"
                name="year"
                value={bookDetails.year}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Genre"
                name="genre"
                value={bookDetails.genre}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            {/* Second Column - Right Side */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Pages"
                name="pages"
                value={bookDetails.pages}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Available Count"
                name="availableCount"
                value={bookDetails.availableCount}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Borrowed Count"
                name="borrowedCount"
                value={bookDetails.borrowedCount}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Remaining Count"
                name="remainingCount"
                value={bookDetails.remainingCount}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Input
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: 'image/*' }}
                fullWidth
                margin="normal"
              />
            </Grid>

            {/* Image Preview */}
            {imagePreview && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Cover Preview"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '300px',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
              </Grid>
            )}

            {/* Description - Full width at the bottom */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={bookDetails.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Books;
