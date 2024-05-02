const Voter = require('../models/voterModel');
const Vote = require('../models/voteModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Voter signup controller
exports.voterSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const voter = await Voter.insert({ name, email, password });
    voter.password = "You Know already. Dont you?"
    res.status(201).json({ message: 'voter created successfully', voterName: voter.name, voterEmail: voter.email, UserVotes: [] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// voter login controller
exports.voterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const voter = await Voter.login(email, password);
    const UserVotes = await Vote.find({ user: voter._id });

    // Generate JWT token
    const id = voter._id;
    const role = 'voter';
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: 'Voter logged in successfully', voterName: voter.name, voterEmail: voter.email ,token, UserVotes});
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
