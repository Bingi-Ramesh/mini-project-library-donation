import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Avatar, Box, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { Person } from '@mui/icons-material'; // Import an icon for default avatars

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openStudentDialog, setOpenStudentDialog] = useState(false); // State for the "Add Student" dialog
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'staff',
  });
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    password: '',
    id:'',
    userType: 'student',
  });

  // Fetch admin data from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAdmin(user);
      if (user.userType === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  // Fetch staff and students data from backend
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get-staff');
        console.log('Fetched staff:', response.data); // Log the response
        if (Array.isArray(response.data)) {
          setStaff(response.data);
        } else {
          console.error('Staff data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get-students');
        console.log('Fetched students:', response.data); // Log the response
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error('Students data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (isAdmin) {
      fetchStaff();
      fetchStudents();
    }
  }, [isAdmin]);

  // Handle adding staff
  const handleAddStaff = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/verify-otp-staff', newStaff);
      console.log('Staff added:', response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  // Handle adding student
  const handleAddStudent = async () => {
    try {
        console.log(newStudent)
      const response = await axios.post('http://localhost:5000/user/verify-otp', newStudent);
      console.log('Student added:', response.data);
      setOpenStudentDialog(false); // Close the "Add Student" dialog
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Handle input changes for staff and student
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'email' || name === 'password' ) {
      setNewStaff((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (name === 'name' || name === 'email' || name === 'password' || name==='id') {
      setNewStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!isAdmin) {
    return (
      <div style={{ padding: '20px', marginTop: '70px' }}>
        <Typography variant="h4" color="textSecondary" align="center">
          You are not authorized to access this page
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', marginTop: '70px', backgroundColor: '#f0f4f8' }}>
      {/* Admin Details Section */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        {admin && (
          <Card elevation={8} style={{ backgroundColor: '#3498db', width: '100%', maxWidth: '450px', borderRadius: '10px' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt={admin.name}
                  src={admin.profilePicture || ''}
                  sx={{ width: 80, height: 80, borderRadius: '50%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                >
                  {!admin.profilePicture && <Person sx={{ fontSize: '50px' }} />}
                </Avatar>
                <div style={{ marginLeft: '20px' }}>
                  <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>
                    Admin Details
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Name: {admin.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Email: {admin.email}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    User Type: {admin.userType}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Buttons Section */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Box mb={3} style={{ width: '100%', maxWidth: '450px' }}>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#16a085',
              color: 'white',
              marginBottom: '15px',
              padding: '15px 0',
              borderRadius: '8px',
              transition: '0.3s',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1abc9c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#16a085'}
          >
            Add Book
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#8e44ad',
              color: 'white',
              marginBottom: '15px',
              padding: '15px 0',
              borderRadius: '8px',
              transition: '0.3s',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => setOpenStudentDialog(true)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#9b59b6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8e44ad'}
          >
            Add Student
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#16a085',
              color: 'white',
              padding: '15px 0',
              borderRadius: '8px',
              transition: '0.3s',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => setOpenDialog(true)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1abc9c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#16a085'}
          >
            Add Staff
          </Button>
          
        </Box>
      </div>

      {/* Registered Staff Section */}
      <div style={{ display: 'flex', marginBottom: '50px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
  <Typography variant="h5" color="textPrimary" gutterBottom style={{ fontWeight: 'bold' }}>
    Registered Staff
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    {staff.length > 0 ? (
      staff.map((staffMember) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={staffMember.id}>
          <Card
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
              transition: '0.3s',
            }}
            elevation={2}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.1)'}
          >
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt={staffMember.name}
                  src={staffMember.profilePicture || ''}
                  sx={{ width: 85, height: 85, borderRadius: '50%' }}
                >
                  {!staffMember.profilePicture && <Person sx={{ fontSize: '45px' }} />}
                </Avatar>
                <div style={{ marginLeft: '20px' }}>
                  <Typography variant="h6" color="textPrimary" style={{ fontWeight: '600' }}>
                    {staffMember.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {staffMember.email}
                  </Typography>
                </div>
              </div>
            </CardContent>
            <CardActions>
            <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#ff1493',
              color: 'white',
              marginBottom: '10px',
              padding: '8px 0',
              borderRadius: '8px',
              transition: '0.3s',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
           
            onMouseEnter={(e) => e.target.style.backgroundColor = '#9b59b6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8e44ad'}
          >
            Remove Staff 
          </Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">No staff available</Typography>
    )}
  </Grid>
</div>


      {/* Registered Students Section */}
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" color="textPrimary" gutterBottom style={{ fontWeight: 'bold' }}>
          Registered Students
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {students.length > 0 ? (
            students.map((student) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={student.id}>
                <Card
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: '0.3s',
                  }}
                  elevation={2}
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
                >
                  <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        alt={student.name}
                        src={student.profilePicture || ''}
                        sx={{ width: 80, height: 80, borderRadius: '50%' }}
                      >
                        {!student.profilePicture && <Person sx={{ fontSize: '40px' }} />}
                      </Avatar>
                      <div style={{ marginLeft: '20px' }}>
                        <Typography variant="h6" color="textPrimary">{student.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{student.email}</Typography>
                        <Typography variant="body2" color="textSecondary">Id:{student.id}</Typography>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                  <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#8e44ad',
              color: 'white',
              marginBottom: '10px',
              padding: '8px 0',
              borderRadius: '8px',
              transition: '0.3s',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
           
         
          >
            Remove Student 
          </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">No students available</Typography>
          )}
        </Grid>
      </div>

      {/* Dialog for Adding Staff */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Staff</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={newStaff.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={newStaff.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={newStaff.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddStaff} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Adding Student */}
      <Dialog open={openStudentDialog} onClose={() => setOpenStudentDialog(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={newStudent.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="id"
            label="Id"
            value={newStudent.id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={newStudent.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={newStudent.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStudentDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddStudent} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
