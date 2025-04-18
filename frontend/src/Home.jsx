import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const Home = () => {
  const [publicPosts, setPublicPosts] = useState([]); // Initialize state for posts

  useEffect(() => {
    const fetchPublicPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get-all-public-posts');
        if (response.data.success && Array.isArray(response.data.posts)) {
          setPublicPosts(response.data.posts);  // Update state with fetched posts
        } else {
          console.error("No posts available or invalid response format");
        }
      } catch (error) {
        console.error('Error fetching public posts:', error);
      }
    };

    fetchPublicPosts(); // Fetch posts on component mount
  }, []);

  return (
    <Box sx={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Public Book Posts
      </Typography>

      {/* Display cards in a grid */}
      {publicPosts && publicPosts.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {publicPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}> {/* Responsive grid layout */}
              <Card sx={{ padding: '20px', textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.bookName}  {/* Assuming `bookName` is the field for book title */}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                    <b>Author:</b> {post.authorName}  {/* Assuming `authorName` is the field for author */}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <b>Genre:</b> {post.genre}  {/* Assuming `genre` is the field for genre */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          No public posts available.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
