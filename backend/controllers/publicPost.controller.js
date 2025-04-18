const PublicPost = require('../modals/publicPost.modal.js');

// Create a new public post
const createPublicPost = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    if (!title || !author|| !genre) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newPost = new PublicPost({
      bookName:title,
      authorName:author,
      genre,
    });

    await newPost.save();

    res.status(201).json({ success: true, message: 'Public post created successfully.' });
  } catch (error) {
    console.error('Error creating public post:', error);
    res.status(500).json({ success: false, message: 'Server error while creating public post.' });
  }
};

// Fetch all public posts
const getAllPublicPosts = async (req, res) => {
  try {
    const posts = await PublicPost.find().sort({ createdAt: -1 });
    if (posts.length === 0) {
        return res.status(200).json({ success: true, message: "No public posts found", posts: [] });
      }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching public posts:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching public posts.' });
  }
};

module.exports = {
  createPublicPost,
  getAllPublicPosts
};
