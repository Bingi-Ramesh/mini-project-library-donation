import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Card, CardContent, Input, Box } from '@mui/material';
import axios from 'axios';

const Books = () => {
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

  useEffect(() => {
    // Check if user is admin from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userType === 'admin') {
      setIsAdmin(true);
    }

    // Fetch books from the backend
    fetchBooks();
  }, []);

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
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Books
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search by Title or Genre"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px' }}
      />

      {/* Conditionally render Add Books button if the user is an admin */}
      {isAdmin && (
        <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
          Add Book
        </Button>
      )}

      {/* Display books or a message if no books are available */}
      <Grid container spacing={4} marginTop={2}>
        {filteredBooks.length === 0 ? (
          <Typography variant="h6" color="textSecondary" align="center" style={{ width: '100%' }}>
            No books found matching your search.
          </Typography>
        ) : (
          filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}>
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
                  <Typography variant="h6" align='center' style={{ fontWeight: 'bold' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" > <b> Author:</b> {book.author}</Typography>
                  <Typography variant="body2"><b> Genre:</b>  {book.genre}</Typography>
                  <Typography variant="body2"><b>published year:</b>  {book.year}</Typography>
                  <Typography variant="body2"><b> pages:</b> {book.pages}</Typography>
                  <Typography variant="body2"><b> availableCount:</b> {book.availableCount}</Typography>
                  <Typography variant="body2"><b> borrowedCount:</b> {book.borrowedCount}</Typography>
                  <Typography variant="body2"><b> remainingCount:</b>  {book.remainingCount}</Typography>
                  <Typography variant="body2"><b> Description:</b> {book.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

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
