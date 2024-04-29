const Voter = require('../models/voterModel');

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
    res.status(200).json({ message: 'Voter logged in successfully', user: voter });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
