const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing the password

// Define the schema for the Student model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Remove leading and trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    lowercase: true,  // Convert email to lowercase before saving
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Simple email regex
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  
});

// Pre-save hook to hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash password if it is modified

  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with the hashed one
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
