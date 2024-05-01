const Voter = require('../models/voterModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Voter signup controller
exports.voterSignup = async (req, res) => {
  try {
    const { name, email, password, age, gender, city, country } = req.body;
    const voter = await Voter.insert({ name, email, password, age, gender, city, country });
    res.status(201).json({ message: 'voter created successfully', user: voter });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// voter login controller
exports.voterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const voter = await Voter.login(email, password);
    // Generate JWT token
    const id = voter._id;
    const role = 'voter';
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: 'Voter logged in successfully', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
