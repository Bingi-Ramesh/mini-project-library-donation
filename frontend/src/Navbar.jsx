import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import logo from './assets/logo.jpg'
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  // Drawer Content
  const drawerContent = (
    <div style={{ width: 250, height: "100%", backgroundColor: "#009688", color: "#fff" }}>
      {/* Close Button (X) */}
      <div style={{ padding: "10px", display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => setDrawerOpen(false)} color="inherit">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Drawer Menu Items */}
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
        <ListItem button onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Signup" />
        </ListItem>
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
            <img src={logo} alt="Logo" style={{ height: 45 ,width:85,borderRadius:20}} />
          </Box>

          {/* For Mobile: Hamburger Menu */}
          {isMobile ? (
            <>
              {/* Hamburger Menu Icon */}
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              {/* Drawer */}
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
              <Button color="inherit">Home</Button>
              
              <Button color="inherit">About</Button>
              <Button color="inherit">Contact</Button>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Signup</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
