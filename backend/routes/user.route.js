const express = require('express');
const { registerStudent, signupStudent, getStudents, deleteStudent } = require('../controllers/student.controller.js'); // Import the controller functions
const { registerStaff, signupStaff, getStaff, deleteStaff } = require('../controllers/staff.controller.js');
const { registerAdmin, signupAdmin } = require('../controllers/admin.controller.js');
const { login } = require('../controllers/login.controller.js');
const { registerBook, getAllBooks, deleteBook } = require('../controllers/books.controller.js');
const router = express.Router();
const upload=require('../middleware/multer.js');
const { createBorrowRequest, getAllBorrowRequests, acceptBorrowRequest, createRenewalRequest, handleRenewal } = require('../controllers/borrowRequest.controller.js');
const { createBookRequest, getAllBookRequests, deleteBookRequest, updateBookRequestStatus } = require('../controllers/bookRequest.controller.js');
const { createPublicPost, getAllPublicPosts, deletePublicPost } = require('../controllers/publicPost.controller.js');
const { addReview, getReviewsByBookId, deleteReview } = require('../controllers/review.controller.js');



router.post('/register', registerStudent);
router.post('/verify-otp',signupStudent);
router.post('/register-staff',registerStaff)
router.post('/verify-otp-staff',signupStaff)
router.post('/register-admin',registerAdmin)
router.post('/verify-otp-admin',signupAdmin)
router.post('/login',login)
router.get('/get-staff',getStaff)
router.post('/delete-staff',deleteStaff)
router.get('/get-students',getStudents)
router.post('/delete-student',deleteStudent)
router.get('/get-books',getAllBooks)
router.post('/delete-book',deleteBook)
router.post('/register-books',upload.single('coverPhoto'), registerBook)
router.post('/register-borrow-request',createBorrowRequest)
router.get('/get-borrow-requests',getAllBorrowRequests)
router.post('/accept-borrow-request',acceptBorrowRequest)
router.post('/cancel-borrow-request',acceptBorrowRequest)
router.post('/request-renewal',createRenewalRequest)
router.post('/handle-renewal',handleRenewal)
router.post('/register-book-request',createBookRequest)
router.post('/cancel-book-request',deleteBookRequest)
router.get('/get-all-book-requests',getAllBookRequests)
router.post('/post-to-public',createPublicPost)
router.get('/get-all-public-posts',getAllPublicPosts)
router.post('/delete-post',deletePublicPost)
router.post('/update-book-request-status',updateBookRequestStatus)
router.post('/add-review',addReview)
router.post('/get-reviews',getReviewsByBookId)
router.post('/delete-review',deleteReview)
module.exports = router;
