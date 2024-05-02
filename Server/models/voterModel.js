const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
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
    minlength: 8
  },
});

// Hash password before saving user to database
voterSchema.pre('save', async function(next) {
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
voterSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Model method for login
voterSchema.statics.login = async function(email, password) {
  const voter = await this.findOne({ email });
  if (!voter) {
    throw new Error('Invalid email or password');
  }
  const isPasswordMatch = await voter.comparePassword(password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }
  return voter;
};

// Model method to insert a new user
voterSchema.statics.insert = async function(userData) {
  try {
    const user = new this(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Model middleware to check if username is unique
voterSchema.pre('validate', async function(next) {
  const user = await this.constructor.findOne({ email: this.email });
  if (user) {
    this.invalidate('email', 'Email must be unique');
  }
  next();
});

// Create User model
const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
