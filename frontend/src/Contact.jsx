import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material';

import rameshImg from './assets/ramesh.jpg';
import maheshImg from './assets/mahesh.jpg';
import anjaliImg from './assets/anjali.jpg';

const teamMembers = [
  {
    name: 'Mr. Bingi Ramesh',
    title: 'Fullstack Developer & Library Admin',
    email: 'bingiramesh@example.com',
    phone: '+91-9392612161',
    image: rameshImg,
    color: '#e3f2fd' // Light Blue
  },
  {
    name: 'Mr. Bingi Mahesh',
    title: 'Shareholder',
    email: 'maheshbingi@example.com',
    phone: '+91-9963012961',
    image: maheshImg,
    color: '#fce4ec' // Light Pink
  },
  {
    name: 'Mrs. Bingi Anjali',
    title: 'Head Staff, Library',
    email: 'anjalibingi@example.com',
    phone: '+91-9908748990',
    image: anjaliImg,
    color: '#e8f5e9' // Light Green
  }
];

const Contact = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: '1000px', margin: 'auto', mt: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        📞 Contact Us
      </Typography>

      <Typography variant="subtitle1" align="center" color="text.secondary" mb={4}>
        Meet the people behind our Library Management System.
      </Typography>

      {/* Top Two Cards */}
      <Grid container spacing={3} justifyContent="center">
        {teamMembers.slice(0, 2).map((member, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <Paper elevation={6} sx={{
              padding: 3,
              borderRadius: 3,
              textAlign: 'center',
              background: member.color,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 10,
              }
            }}>
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{
                  width: 90,
                  height: 90,
                  margin: 'auto',
                  mb: 2,
                  border: '2px solid #fff',
                  boxShadow: 2
                }}
              />
              <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {member.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">📧 {member.email}</Typography>
              <Typography variant="body2" color="text.secondary">📞 {member.phone}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Card */}
      <Grid container spacing={3} justifyContent="center" mt={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={6} sx={{
            padding: 3,
            borderRadius: 3,
            textAlign: 'center',
            background: teamMembers[2].color,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 10,
            }
          }}>
            <Avatar
              src={teamMembers[2].image}
              alt={teamMembers[2].name}
              sx={{
                width: 90,
                height: 90,
                margin: 'auto',
                mb: 2,
                border: '2px solid #fff',
                boxShadow: 2
              }}
            />
            <Typography variant="h6" fontWeight="bold">{teamMembers[2].name}</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {teamMembers[2].title}
            </Typography>
            <Typography variant="body2" color="text.secondary">📧 {teamMembers[2].email}</Typography>
            <Typography variant="body2" color="text.secondary">📞 {teamMembers[2].phone}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 5 }} />

      {/* Contact Form */}
      <Paper elevation={4} sx={{
        padding: 4,
        borderRadius: 3,
        background: '#f5f5f5'
      }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Send Us a Message
        </Typography>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Name" variant="outlined" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Email" type="email" variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Message"
                multiline
                rows={4}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5
                }}
              >
                🚀 Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;
