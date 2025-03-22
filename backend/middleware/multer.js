const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create the uploads directory if it doesn't exist
const uploadDirectory = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define where to store the uploaded file
    cb(null, uploadDirectory);  // Store images in the "uploads" directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to filename
  }
});

// Initialize multer with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only allow image files (jpg, jpeg, png)
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'), false);
  }
});

module.exports = upload;
