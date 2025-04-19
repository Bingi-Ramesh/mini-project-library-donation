import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Container } from '@mui/material';
import { School, Work, AdminPanelSettings } from '@mui/icons-material'; // Icons for Student, Staff, Admin
import { Link } from "react-router-dom";
import signupbg from './assets/signup-bg.jpg';

const PreSignUp = () => {
    const API_URL = import.meta.env.VITE_API_BASE;
    return (
        // Outer Box with background image
        <Box
            sx={{
                backgroundImage: `url(${signupbg})`, // Set the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%',  // Full viewport width
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Inner Box for content with marginTop */}
            <Box
                sx={{
                    marginTop: '90px', // Apply margin-top to push the content down
                    width: '100%',
                    maxWidth: 'sm',
                }}
            >
                {/* Main Card */}
                <Card
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: 5,
                        padding: 2,
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" align="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
                            Sign Up
                        </Typography>

                        <Typography variant="h6" align="center" sx={{ marginBottom: 3 }}>
                            Choose your role
                        </Typography>

                        <Grid container spacing={3} justifyContent="center">
                            {/* Student Card */}
                            <Grid item xs={12} sm={4}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 3,
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        backgroundColor: '#e1f5fe', // Light blue for student
                                    }}
                                >
                                    <CardMedia>
                                        <School sx={{ fontSize: 50, color: '#2196f3' }} />
                                    </CardMedia>
                                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                                        Student
                                    </Typography>
                                    <Button component={Link} to="/signup-student"
                                        variant="contained"
                                        sx={{
                                            marginTop: 1,
                                            background: 'linear-gradient(to right, #e91e63, #9c27b0)',
                                            '&:hover': {
                                                background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                                            },
                                            padding: '6px 20px',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        Select
                                    </Button>
                                </Card>
                            </Grid>

                            {/* Staff Card */}
                            <Grid item xs={12} sm={4}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 3,
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        backgroundColor: '#e1bee7', // Light green for staff
                                    }}
                                >
                                    <CardMedia>
                                        <Work sx={{ fontSize: 50, color: '#4caf50' }} />
                                    </CardMedia>
                                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                                        Staff
                                    </Typography>
                                    <Button component={Link} to="/signup-staff"
                                        variant="contained"
                                        sx={{
                                            marginTop: 1,
                                            background: 'linear-gradient(to right, #e91e63, #9c27b0)',
                                            '&:hover': {
                                                background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                                            },
                                            padding: '6px 20px',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        Select
                                    </Button>
                                </Card>
                            </Grid>

                            {/* Admin Card */}
                            <Grid item xs={12} sm={4}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 3,
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        backgroundColor: '#fff9c4', // Light pink for admin
                                    }}
                                >
                                    <CardMedia>
                                        <AdminPanelSettings sx={{ fontSize: 50, color: '#e91e63' }} />
                                    </CardMedia>
                                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                                        Admin
                                    </Typography>
                                    <Button component={Link} to="/signup-admin"
                                        variant="contained"
                                        color='secondary'
                                        sx={{
                                            marginTop: 1,
                                            
                                            background: 'linear-gradient(to right, #e91e63, #9c27b0)', // Same blue gradient for all buttons
                                            '&:hover': {
                                                background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                                            },
                                            padding: '6px 20px',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        Select
                                    </Button>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default PreSignUp;
