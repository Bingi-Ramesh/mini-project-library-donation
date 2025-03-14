// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
// import Home from './Home'; // Assuming you have a Home component
// import About from './About'; // Assuming you have an About component
// import Contact from './Contact'; // Assuming you have a Contact component

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be shown on all pages */}
      <Routes>
       
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
