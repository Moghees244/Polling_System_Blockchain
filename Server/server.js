const express = require('express');
const { connect_database } = require('./config/database');
const voterRoutes = require('./routes/voterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
// Connect to the database
connect_database();

// Middleware for parsing JSON bodies
app.use(express.json());

// Use voter routes
app.use('/', voterRoutes);

// Use admin routes
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
