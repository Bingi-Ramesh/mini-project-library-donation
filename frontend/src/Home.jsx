import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Carousel images
import banner1 from './assets/carousel1.webp';
import banner2 from './assets/carousel2.webp';
import banner3 from './assets/carousel3.jpg';

const Home = () => {
  const [publicPosts, setPublicPosts] = useState([]);
  const sliderRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  useEffect(() => {
    const fetchPublicPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get-all-public-posts');
        if (response.data.success && Array.isArray(response.data.posts)) {
          setPublicPosts(response.data.posts);
        } else {
          console.error("No posts available or invalid response format");
        }
      } catch (error) {
        console.error('Error fetching public posts:', error);
      }
    };

    fetchPublicPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.post('http://localhost:5000/user/delete-post', { postId });
      if (response.data.success) {
        setPublicPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
      } else {
        console.error('Delete failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const imageSliderSettings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const bookSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const renderPagination = () => {
    const numPages = Math.ceil(publicPosts.length / 4);
    return Array.from({ length: numPages }, (_, index) => (
      <Button
        key={index}
        onClick={() => sliderRef.current.slickGoTo(index)}
        sx={{
          minWidth: 'auto',
          margin: '0 5px',
          fontWeight: index === 0 ? 'bold' : 'normal',
          color: index === 0 ? 'primary.main' : 'text.primary',
          borderRadius: '50%',
          backgroundColor: index === 0 ? 'primary.light' : 'transparent',
          padding: '6px 12px',
          '&:hover': {
            backgroundColor: index === 0 ? 'primary.main' : 'primary.light',
            color: '#fff',
          },
        }}
      >
        {index + 1}
      </Button>
    ));
  };

  return (
    <Box sx={{ mt: 10 }}>
      {/* Top Image Carousel */}
      <Slider {...imageSliderSettings}>
        {[banner1, banner2, banner3].map((img, idx) => (
          <Box key={idx} sx={{ height: { xs: 180, sm: 300, md: 400 }, overflow: 'hidden' }}>
            <img
              src={img}
              alt={`banner-${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* Wanted Books Section */}
      <Box sx={{ px: 4, mt: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          📚 Wanted Books
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
          If you are willing to donate, please contact our library.
        </Typography>

        {publicPosts && publicPosts.length > 0 ? (
          <Box>
            <Slider ref={sliderRef} {...bookSliderSettings}>
              {publicPosts.map((post, index) => (
                <Box key={index} sx={{ px: 1 }}>
                <Card
  sx={{
    p: 2,
    textAlign: 'center',
    height: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#f1f8e9', // Light blue / light pink alternating
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
  }}
>

                    {user?.userType && user.userType !== 'student' && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeletePost(post._id)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '&:hover': { backgroundColor: 'error.light', color: '#fff' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {post.bookName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        <b>Author:</b> {post.authorName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <b>Genre:</b> {post.genre}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>

            {/* Custom Numbered Pagination */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              {renderPagination()}
            </Box>
          </Box>
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            No public posts available.
          </Typography>
        )}
      </Box>

      {/* Reading Zone Info Card */}
      <Box sx={{ px: 4, mt: 10, mb: 10 }}>
        <Card
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: 3,
            borderRadius: '12px',
            backgroundColor: '#f3e5f5', // Light visible background
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <NewspaperIcon fontSize="medium" /> Reading Zone
            </Typography>

            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
              A quiet space for enjoying newspapers daily.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChairAltIcon color="action" /> Comfortable seating available
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NewspaperIcon color="action" /> State & Central daily newspapers
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon color="action" /> 9:00 AM – 5:00 PM
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventAvailableIcon color="action" /> Open on working days
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
