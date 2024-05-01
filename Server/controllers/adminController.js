const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');


// Admin login controller
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.login(email, password);
    // Generate JWT token
    const id = admin._id;
    const role = 'admin';
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: 'Admin logged in successfully', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};