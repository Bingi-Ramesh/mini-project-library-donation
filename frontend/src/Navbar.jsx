import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import logo from './assets/logo.jpg';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null); // Track the user state
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    // Function to fetch user from localStorage
    const getUserFromLocalStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    // Initially fetch user
    getUserFromLocalStorage();

    // Set an interval to check for changes in localStorage every 1 second
    const intervalId = setInterval(() => {
      getUserFromLocalStorage();
    }, 1000);

    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  // Drawer Content
  const drawerContent = (
    <div style={{ width: 250, height: "100%", backgroundColor: "#009688", color: "#fff" }}>
      <div style={{ padding: "10px", display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => setDrawerOpen(false)} color="inherit">
          <CloseIcon />
        </IconButton>
      </div>
      <List>
        <ListItem button onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Contact" />
        </ListItem>
        
        
        {user ? (
          <>
            <ListItem button component={Link} to="/profile" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/books" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Books" />
            </ListItem>
            <ListItem button component={Link} to="/borrowals" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Borrowals" />
            </ListItem>
            
            {user.userType === 'admin' && (
              <ListItem button component={Link} to="/admin-dashboard" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            )}
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/pre-signup" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
  

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#009688",
          boxShadow: "none",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1300, // AppBar is on top
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: "64px",
          }}
        >
          {/* Logo and LMS Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: 5, color: "#ffffff" }}>
              LMS CONNECT
            </Typography>
            <img src={logo} alt="Logo" style={{ height: 45, width: 85, borderRadius: 20 }} />
          </Box>

          {/* For Mobile: Hamburger Menu */}
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                  transition: "all 0.3s ease",
                  zIndex: 1400, // Ensure Drawer appears above AppBar
                }}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            // For Larger Screens: Navbar Buttons
            <Box sx={{ display: "flex", gap: "20px" }}>
           <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
            <Button color="inherit">About</Button>
            <Button color="inherit" component={Link} to="/contact">
                  Contact
                </Button>
          
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
                <Button color="inherit" component={Link} to="/books">
                  Books
                </Button>
                <Button color="inherit" component={Link} to="/borrowals">
                  Borrowals
                </Button>
                {user.userType === 'admin' && (
                  <Button color="inherit" component={Link} to="/admin-dashboard">
                    Admin Dashboard
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/pre-signup">
                  Signup
                </Button>
              </>
            )}
          </Box>
          
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
