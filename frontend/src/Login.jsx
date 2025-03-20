import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container, Paper, Link } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom
import loginBg from './assets/asia-culturecenter-G92tQzil0dI-unsplash.jpg';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/user/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.message.includes('success')) {
                const { token, user } = response.data; // Destructure token and user data from the response

                // Store the token and user details in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user)); // Store user details as a string

                console.log("User details:", user); // Log the user details

                alert("Login successful");
                setError("")
                // Optionally, redirect to another page after successful login
                // For example, you can use `history.push("/dashboard")` or `window.location.href = "/dashboard"`
            } else {
                setError(response.data.message || "Invalid credentials.");
            }
        } catch (error) {
            setError("Network error, please try again.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Set background for the entire page */}
            <Box
                sx={{
                    minHeight: '100vh', // Make sure the background covers the entire viewport height
                    backgroundImage: `url(${loginBg})`, // Set the background image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center', // Center the form horizontally
                    alignItems: 'center', // Center the form vertically
                   
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        padding: 3,
                    }}
                >
                    <Paper
                        sx={{
                            padding: 3,
                            borderRadius: 5,
                            boxShadow: 10,
                            background: "linear-gradient(to right, #e0c3fc, #8ec5fc)", // Light blue gradient (original background)
                        }}
                    >
                        <Typography variant="h5" align="center" marginBottom={3} sx={{ color: "#3f51b5" }}>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={formData.email}
                                onChange={handleInputChange}
                                sx={{
                                    marginBottom: 2,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        backgroundColor: "#fff3e0", // Original color for form fields
                                    },
                                }}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formData.password}
                                onChange={handleInputChange}
                                sx={{
                                    marginBottom: 2,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        backgroundColor: "#fff3e0", // Original color for form fields
                                    },
                                }}
                            />
                            {error && (
                                <Typography color="error" variant="body2" align="center" marginBottom={2}>
                                    {error}
                                </Typography>
                            )}
                            <Typography align="center">
                                Don't have an account?{" "}
                                <Link component={RouterLink} to="/signup" sx={{ textDecoration: "none", color: "#3f51b5" }}>
                                    Sign Up
                                </Link>
                            </Typography>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    padding: 1.5,
                                    borderRadius: "15px",
                                    background: "linear-gradient(to right, #66BB6A, #388E3C)", // Green gradient (original color)
                                    "&:hover": {
                                        background: "linear-gradient(to right, #4CAF50, #388E3C)", // Darker gradient on hover
                                    },
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                {loading ? "Logging In..." : "Login"}
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default Login;
