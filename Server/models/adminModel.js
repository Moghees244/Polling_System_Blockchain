const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(value) {
        // Regular expression for email validation
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
});

// Hash password before saving admin to database
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Model method for login
adminSchema.statics.login = async function(email, password) {
  const admin = await this.findOne({ email });
  if (!admin) {
    throw new Error('Invalid email or password');
  }
  const isPasswordMatch = await admin.comparePassword(password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }
  return admin;
};

// Create Admin model
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
