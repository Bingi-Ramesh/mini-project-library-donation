import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Stack,
  Link,
} from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code'; // For LeetCode (you can customize this)
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'; // For GeeksforGeeks
import member1 from './assets/anjali.jpg';
import member2 from './assets/mahesh.jpg';

const infoCards = [
  {
    title: '📘 Who We Are',
    content: 'We are a dedicated LMS platform focused on free educational access, book sharing, and community learning.',
    bg: '#ffffff',
  },
  {
    title: '🎯 Our Mission',
    content: 'To offer seamless digital tools for borrowing books, encouraging donations, and connecting learners — for free.',
    bg: '#ffffff',
  },
  {
    title: '🌱 Our Vision',
    content: 'To build a world where knowledge is accessible to everyone, anytime, through a dynamic learning ecosystem.',
    bg: '#f0f4f8',
  },
  {
    title: '📚 What We Offer',
    content: '• Lending books for free\n• Accepting book donations\n• Digital renewals\n• Notifications for requested books',
    bg: '#f0f4f8',
  },
];

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'Lead Developer',
    image: member1,
  },
  {
    name: 'David Kim',
    role: 'Product Designer',
    image: member2,
  },
];

const AboutUs = () => {
  return (
    <Box>
      {/* ABOUT US HEADER */}
      <Box sx={{ backgroundColor: '#e0f7fa', py: 5 ,marginTop:10 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ color: '#d81b60' }}>
            About Us
          </Typography>
        </Container>
      </Box>

      {/* INFO SECTIONS */}
      {infoCards.reduce((rows, card, i) => {
        if (i % 2 === 0) rows.push([card]);
        else rows[rows.length - 1].push(card);
        return rows;
      }, []).map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ backgroundColor: row[0].bg, py: 6 }}>
          <Container>
            <Grid container spacing={4}>
              {row.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: '#ffffff',
                      borderLeft: '6px solid #26a69a',
                      borderRadius: 2,
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: '#26a69a' }}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: 'pre-line', color: '#555' }}
                      >
                        {item.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      ))}

      {/* TEAM SECTION */}
      <Box sx={{ backgroundColor: '#fff9f0', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ color: '#ff7043' }}>
            👥 Meet the Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3 }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography color="text.secondary">{member.role}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CONTACT SECTION AS CARD */}
      <Box sx={{ backgroundColor: '#f0fff4', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ color: '#43a047' }}>
            📫 Get in Touch
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8}>
              <Card sx={{ p: 3, boxShadow: 3, backgroundColor: '#ffffff' }}>
                <Stack direction="row" spacing={3} sx={{ mb: 2, justifyContent: 'center' }}>
                  <IconButton
                    component={Link}
                    href="https://www.instagram.com/bingi_ramesh_yadav/"
                    target="_blank"
                    sx={{ color: '#e91e63' }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    href="https://linkedin.com/in/bingi-ramesh-02b754280"
                    target="_blank"
                    sx={{ color: '#0e76a8' }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                    {/* GitHub */}
      <IconButton
        component={Link}
        href="https://github.com/Bingi-Ramesh" // Update with your GitHub URL
        target="_blank"
        sx={{ color: '#333' }}
      >
        <GitHubIcon />
      </IconButton>

      {/* LeetCode */}
      <IconButton
        component={Link}
        href="https://leetcode.com/u/Bingi_Ramesh/" // Update with your LeetCode URL
        target="_blank"
        sx={{ color: '#ffa500' }} // LeetCode color (customize if needed)
      >
        <CodeIcon />
      </IconButton>

   
                 
                </Stack>
                <Typography align="center" variant="body1" sx={{ color: '#444' }}>
                  Email: rameshyadavbingi776@gmail.com<br />
                  Phone: +91 9392612161
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;
