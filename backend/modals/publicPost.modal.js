const mongoose = require('mongoose');

const publicPostSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const PublicPost = mongoose.model('PublicPost', publicPostSchema);

module.exports = PublicPost;
