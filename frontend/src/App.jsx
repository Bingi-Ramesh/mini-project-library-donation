// src/App.jsx
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function App() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to MUI
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
        >
          Home
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<HomeIcon />}
        >
          Settings
        </Button>
      </Box>
    </Container>
  );
}

export default App;
