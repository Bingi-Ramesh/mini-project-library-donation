import React, { useState } from "react";
import { Button, TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl, Container, Paper, Modal, Link } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom"; // Import the Link component from react-router-dom

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        userType: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(null); // Store the OTP from the backend
    const [otpInput, setOtpInput] = useState(""); // Store the user-entered OTP
    const [showOtpModal, setShowOtpModal] = useState(false); // Show OTP input modal

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOtpInputChange = (e) => {
        setOtpInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/user/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
console.log(response.data)
            if (response.data.student.otp) {
                // OTP received from backend, show OTP input modal
                setOtp(response.data.student.otp);
                setShowOtpModal(true);
            } else {
                alert("Signup successful");
                setFormData({
                    name: "",
                    id: "",
                    userType: "",
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            setError("Network error, please try again.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = () => {
        if (otp == otpInput) {
            alert("Signup successful");
            setFormData({
                name: "",
                id: "",
                userType: "",
                email: "",
                password: "",
            });
            setOtp(null);
            setOtpInput("");
            setShowOtpModal(false);
        } else {
            setError("Invalid OTP, please try again.");
        }
    };

    return (
        <Container 
        maxWidth="sm" 
        sx={{ 
            marginTop: 10, 
            // Example gradient (orange-pink combination)
            borderRadius: 2, // Optional: Add border radius if needed
            padding: 3, // Optional: Padding to ensure content is not touching the edges
        }}
    >
           <Paper sx={{
    padding: 3, 
    borderRadius: 5, 
    boxShadow: 10, 
    background: "linear-gradient(to right, #e0c3fc, #8ec5fc)", // Light blue gradient
}}>
                <Typography variant="h5" align="center" marginBottom={3} sx={{ color: '#3f51b5' }}>
                    Sign Up Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <TextField
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={handleInputChange}
                        sx={{
                            marginBottom: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                backgroundColor: "#fff3e0",
                            },
                        }}
                    />

                    {/* ID Field */}
                    <TextField
                        label="ID"
                        name="id"
                        variant="outlined"
                        fullWidth
                        value={formData.id}
                        onChange={handleInputChange}
                        sx={{
                            marginBottom: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                backgroundColor: "#fff3e0",
                            },
                        }}
                    />

                    {/* User Type Dropdown */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>User Type</InputLabel>
                        <Select
                            label="User Type"
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                            required
                            sx={{
                                marginBottom: 2,
                                borderRadius: "15px",
                                backgroundColor: "#fff3e0",
                            }}
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="staff">Staff</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Email Field */}
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
                                backgroundColor: "#fff3e0",
                            },
                        }}
                    />

                    {/* Password Field */}
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
                                backgroundColor: "#fff3e0",
                            },
                        }}
                    />

                    {/* Error Message */}
                    {error && (
                        <Typography color="error" variant="body2" align="center" marginBottom={2}>
                            {error}
                        </Typography>
                    )}
                    {/* Link to Login page */}
                    <Typography align="center" >
                        Already have an account?{" "}
                        <Link component={RouterLink} to="/login" sx={{ textDecoration: "none", color: '#3f51b5' }}>
                        Login
                    </Link>
                    </Typography>
                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        
                        disabled={loading}
                        sx={{
                            padding: 1.5,
                            borderRadius:"15px",
                            background: "linear-gradient(to right, #FF7043, #FF5722)",
                            "&:hover": {
                                background: "linear-gradient(to right, #FF5722, #E64A19)", // Change gradient on hover
                                transform: "scale(1.05)", // Slightly scale the button on hover
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                            },
                            transition: "all 0.3s ease", // Smooth transition for all properties (background, scale, box-shadow)
                        }}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>


            </Paper>

            {/* OTP Modal */}
            <Modal
                open={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                aria-labelledby="otp-modal"
                aria-describedby="otp-modal-description"
            >
                <Box sx={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    backgroundColor: "white", padding: 3, borderRadius: 2, boxShadow: 24, width: 300
                }}>
                    <Typography variant="h6" align="center" marginBottom={2}>
                        Enter OTP
                    </Typography>
                    <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        value={otpInput}
                        onChange={handleOtpInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleOtpSubmit}
                        sx={{
                            padding: 1.5,
                            backgroundColor: '#FF5722',
                            "&:hover": {
                                backgroundColor: '#E64A19',
                            },
                        }}
                    >
                        Submit OTP
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default Signup;
