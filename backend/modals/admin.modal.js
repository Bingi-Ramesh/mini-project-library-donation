const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    lowercase: true,  
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], 
  },
  userType:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  
});


adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); 

  try {
    const salt = await bcrypt.genSalt(10);  
    this.password = await bcrypt.hash(this.password, salt);  
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with the hashed one
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Student model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
