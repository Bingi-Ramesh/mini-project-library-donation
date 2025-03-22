// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Navbar from './Navbar';
import Signup from './Signup-student';
import Login from './Login';
import Signupstaff from './Signup-staff';
import Signupadmin from './Signup-admin';
import PreSignUp from './PreSignUp';
import Profile from './Profile';
import AdminDashboard from './AdminDashboard';
import Books from './Books';
// import Home from './Home'; // Assuming you have a Home component
// import About from './About'; // Assuming you have an About component
// import Contact from './Contact'; // Assuming you have a Contact component

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be shown on all pages */}
      <Routes>
       
       
        <Route path="/login" element={<Login />} />
        <Route path="/pre-signup" element={<PreSignUp />} />
        <Route path="/signup-student" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/signup-staff" element={<Signupstaff/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/signup-admin" element={<Signupadmin />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
