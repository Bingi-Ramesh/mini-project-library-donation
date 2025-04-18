const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  lendingDays: {
    type: Number,
    default: 30,
    min: 1,
  },
  renewalDays: {
    type: Number,
    required:false
  },
  status: {
    type: String,
   
    default: 'pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
