import React, { useState } from "react";
import { Button, TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl, Container, Paper, Modal, Link } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom"; // Import the Link component from react-router-dom
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
       userType:"",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(null); // Store the OTP from the backend
    const [otpInput, setOtpInput] = useState(""); // Store the user-entered OTP
    const [showOtpModal, setShowOtpModal] = useState(false); // Show OTP input modal
    const [finalUserData, setFinalUserData] = useState(null); // Store final user data after OTP verification
console.log(finalUserData)
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
            formData.userType="student"
            const response = await axios.post("http://localhost:5000/user/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            if(response.data.error){
                setError(response.data.error)
            }
            else if (response.data.student.otp) {
                // OTP received from backend, show OTP input modal
                setError("")
                setOtp(response.data.student.otp);
                setShowOtpModal(true);
            } else {
                setError(response.data.error)
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

    const handleOtpSubmit = async () => {
        if (otp == otpInput) {
            alert("OTP verified successfully!");

            // Store final user data excluding OTP
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                userType:formData.userType,
                id:formData.id
            };

            setFinalUserData(userData); // Set the final user data

            try {
                // Send the user data without OTP to the backend for final registration
                const response = await axios.post("http://localhost:5000/user/verify-otp", userData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.data.message.includes("success")) {
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
                    setError("")
                    navigate("/login")
                } else {
                    console.log(response.data)
                    setError(response.data.error);
                }
            } catch (error) {
                setError("network error");
                console.log(error)
            }
        } else {
            setError("Invalid OTP, please try again.");
        }
    };

    return (
        <Container 
            maxWidth="sm" 
            sx={{ 
                marginTop: 10, 
                borderRadius: 2, 
                padding: 3,
            }}
        >
            <Paper sx={{
                padding: 3, 
                borderRadius: 5, 
                boxShadow: 10, 
                background: "linear-gradient(to right, #e0c3fc, #8ec5fc)", 
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
                                background: "linear-gradient(to right, #FF5722, #E64A19)", 
                                transform: "scale(1.05)", 
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", 
                            },
                            transition: "all 0.3s ease", 
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
