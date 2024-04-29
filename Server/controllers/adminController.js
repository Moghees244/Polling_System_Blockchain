const Admin = require('../models/adminModel');

// Admin login controller
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.login(email, password);
    res.status(200).json({ message: 'Admin logged in successfully', admin });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
