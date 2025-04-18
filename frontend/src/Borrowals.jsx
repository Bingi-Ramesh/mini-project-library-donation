import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import axios from 'axios';

const Borrowals = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [borrowedRequests, setBorrowedRequests] = useState([]);
  const [renewalRequests, setRenewalRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openRenewDialog, setOpenRenewDialog] = useState(false);
  const [renewDays, setRenewDays] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const isStaffOrAdmin = user && (user.userType === 'staff' || user.userType === 'admin');
  const isStudent = user && user.userType === 'student';

  useEffect(() => {
    const fetchBorrowRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get-borrow-requests');
        const requests = response.data;

        if (isStudent) {
          const studentRequests = requests.filter(req => req.student._id === user._id);
          setPendingRequests(studentRequests.filter(req => req.status === 'pending'));
          setBorrowedRequests(studentRequests.filter(req => req.status === 'borrowed'));
          setRenewalRequests(studentRequests.filter(req => req.status.includes('renewal')));
        } else {
          setPendingRequests(requests.filter(req => req.status === 'pending'));
          setBorrowedRequests(requests.filter(req => req.status === 'borrowed'));
          setRenewalRequests(requests.filter(req => req.status.includes('renewal')));
        }
      } catch (error) {
        console.error('Error fetching borrow/renewal requests:', error);
      }
    };

    if (user && user._id) {
      fetchBorrowRequests();
    }
  }, [user]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post('http://localhost:5000/user/accept-borrow-request', {
        borrowRequestId: requestId,
        status: 'borrowed',
      });

      const updatedRequest = pendingRequests.find(req => req._id === requestId);
      setPendingRequests(prev => prev.filter(req => req._id !== requestId));
      setBorrowedRequests(prev => [...prev, updatedRequest]);

    } catch (error) {
      console.error('Error accepting the borrow request:', error);
    }
  };

  const handleCancel = async (requestId) => {
    try {
      await axios.post('http://localhost:5000/user/cancel-borrow-request', {
        borrowRequestId: requestId,
      });

      setPendingRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Error canceling the borrow request:', error);
    }
  };

  const handleShowMore = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleRenewalRequest = (request) => {
    setSelectedRequest(request);
    setOpenRenewDialog(true);
  };

  const handleRenewalSubmit = async () => {
    const days = parseInt(renewDays);
    if (isNaN(days) || days <= 0 || days > 30) {
      alert('Please enter a valid number of days (1-30).');
      return;
    }

    try {
      await axios.post('http://localhost:5000/user/request-renewal', {
        borrowRequestId: selectedRequest._id,
        renewalDays: days,
        status: 'renewal pending'
      });

      alert('Renewal request sent!');
      setOpenRenewDialog(false);
      setRenewDays('');
    } catch (error) {
      console.error('Error sending renewal request:', error);
    }
  };

  const handleAcceptRenewal = async (requestId) => {
    try {
      await axios.post('http://localhost:5000/user/handle-renewal', {
        borrowRequestId: requestId,
        status: 'renewal accepted',
      });

      setRenewalRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Error accepting renewal request:', error);
    }
  };

  const handleRejectRenewal = async (requestId) => {
    try {
      await axios.post('http://localhost:5000/user/handle-renewal', {
        borrowRequestId: requestId,
        status: 'renewal rejected',
      });

      setRenewalRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Error rejecting renewal request:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', marginTop: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Borrow Requests</Typography>

      {/* Pending Requests */}
      <Typography variant="h5" sx={{ marginBottom: '10px' }}>Pending Requests</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {pendingRequests.map(request => (
          <Card key={request._id} sx={{ width: 250, padding: '10px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{request.book?.title || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">Requested by: {request.student?.name}</Typography>
              <Typography variant="body2" color="text.secondary">Days: {request.lendingDays}</Typography>
              <Typography variant="body2" color="text.secondary">Status: {request.status}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {isStaffOrAdmin && (
                  <>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleAccept(request._id)}>Accept</Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleCancel(request._id)}>Cancel</Button>
                  </>
                )}
                <Button variant="text" size="small" onClick={() => handleShowMore(request)}>Show More</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Borrowed Requests */}
      <Typography variant="h5" sx={{ marginTop: '40px', marginBottom: '10px' }}>Already Borrowed</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {borrowedRequests.map(request => (
          <Card key={request._id} sx={{ width: 250, padding: '10px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{request.book?.title || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">Borrowed by: {request.student?.name}</Typography>
              <Typography variant="body2" color="text.secondary">Days: {request.lendingDays}</Typography>
              <Typography variant="body2" color="text.secondary">Status: {request.status}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {isStudent && (
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleRenewalRequest(request)}>Renew</Button>
                )}
                <Button variant="text" size="small" onClick={() => handleShowMore(request)}>Show More</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Renewal Requests */}
      <Typography variant="h5" sx={{ marginTop: '40px', marginBottom: '10px' }}>Renewals</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {renewalRequests.map(request => (
          <Card key={request._id} sx={{ width: 250, padding: '10px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{request.book?.title || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">Requested by: {request.student?.name}</Typography>
              <Typography variant="body2" color="text.secondary">Renewal Days: {request.renewalDays}</Typography>
              <Typography variant="body2" color="text.secondary">Status: {request.status}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {isStaffOrAdmin && request.status === 'renewal pending' && (
                  <>
                    <Button variant="contained" color="success" size="small" onClick={() => handleAcceptRenewal(request._id)}>Accept</Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleRejectRenewal(request._id)}>Reject</Button>
                  </>
                )}
                {isStudent && (
                  <Button variant="text" size="small" onClick={() => handleShowMore(request)}>Show More</Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Show More Dialog */}
      {selectedRequest && selectedRequest.book && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Request Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedRequest.book.title}</Typography>
            <Typography><strong>Author:</strong> {selectedRequest.book.author}</Typography>
            <Typography><strong>Year:</strong> {selectedRequest.book.year}</Typography>
            <Typography><strong>Genre:</strong> {selectedRequest.book.genre}</Typography>
            <Typography><strong>Pages:</strong> {selectedRequest.book.pages}</Typography>
            <Typography><strong>Description:</strong> {selectedRequest.book.description}</Typography>
            <Typography><strong>Requested by:</strong> {selectedRequest.student.name}</Typography>
            <Typography><strong>Email:</strong> {selectedRequest.student.email}</Typography>
            <Typography><strong>Lending Days:</strong> {selectedRequest.lendingDays}</Typography>
            <Typography><strong>Status:</strong> {selectedRequest.status}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Renewal Dialog */}
      {selectedRequest && (
        <Dialog open={openRenewDialog} onClose={() => setOpenRenewDialog(false)}>
          <DialogTitle>Request Renewal</DialogTitle>
          <DialogContent>
            <TextField
              label="Enter additional days (max 30)"
              type="number"
              fullWidth
              value={renewDays}
              onChange={(e) => setRenewDays(e.target.value)}
              inputProps={{ max: 30, min: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRenewDialog(false)} color="error">Cancel</Button>
            <Button onClick={handleRenewalSubmit} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Borrowals;
