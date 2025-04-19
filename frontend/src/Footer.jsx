import React from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 10,
        py: 3,
        px: 2,
        bgcolor: '#009688', // Updated color
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        📚 Library Management System
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Empowering readers through technology. Designed with ❤️ by your team.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <IconButton
          component="a"
          href="https://www.instagram.com/bingi_ramesh_yadav/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#fff' }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com/in/bingi-ramesh-02b754280"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#fff' }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:rameshyadavbingi776@gmail.com"
          sx={{ color: '#fff' }}
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          component="a"
          href="tel:+919392612161"
          sx={{ color: '#fff' }}
        >
          <PhoneIcon />
        </IconButton>
      </Stack>

      <Typography variant="caption" display="block">
        © {new Date().getFullYear()} LMS. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
