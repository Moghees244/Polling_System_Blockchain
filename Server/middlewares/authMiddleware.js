const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key for JWT token
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT token
authenticateUser = (req, res, next) => {
  // Extract token from request header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

authenticateAdmin = (req, res, next) => {
  // Extract token from request header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, secretKey);

    // Check if user has admin role
    if (decodedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    // Set user data in request object
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = {authenticateAdmin, authenticateUser};