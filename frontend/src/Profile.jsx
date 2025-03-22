import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
    } else {
      // Redirect to login if no user is found in localStorage
      navigate('/login');
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    // Clear the user from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const { name, userType, email, id } = user;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
      <Paper sx={{ width: 350, padding: 3, boxShadow: 3, borderRadius: 3, backgroundColor: '#fafafa' }}>
        <Card
          sx={{
            width: '100%',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #8e2de2, #4a00e0)'  ,
            color: 'white', // Text color white to contrast with the gradient background
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for card
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
              <Avatar
                alt="User Avatar"
                src="https://www.w3schools.com/w3images/avatar2.png" // Default avatar image
                sx={{
                  width: 100,
                  height: 100,
                  border: '4px solid #fff', // White border around the avatar
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Shadow for the avatar
                }}
              />
            </Box>
            <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: '#fff' }}>
            <b>  {name}</b>  
            </Typography>
            <Typography variant="body2" color="white" align="center" sx={{ marginTop: 1 }}>
              {email}
            </Typography>
            <Typography variant="body2" color="white" align="center" sx={{ marginTop: 1 }}>
              User Type: <strong>{userType}</strong>
            </Typography>
            {userType === 'student' && (
              <Typography variant="body2" color="white" align="center" sx={{ marginTop: 1 }}>
                ID: <strong>{id}</strong>
              </Typography>
            )}
            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
  variant="contained"
  onClick={handleLogout}
  sx={{
    padding: '12px 30px',
    borderRadius: 25, // More rounded corners
    background: 'linear-gradient(135deg, #f8b400, #ff0080)', // Gradient background
    color: '#fff', // White text
    fontWeight: 'bold', // Bold text
    textTransform: 'none', // Prevent text transformation (no all caps)
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effect
    '&:hover': {
      background: 'linear-gradient(135deg, #ff0080, #f8b400)', // Hover effect with reversed gradient
      transform: 'scale(1.05)', // Slight scale-up on hover
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
    },
    '&:active': {
      transform: 'scale(0.98)', // Slight shrink effect when clicked
    },
  }}
>
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default Profile;
