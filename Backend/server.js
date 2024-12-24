const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes


// Apply routes
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes); // Use auth routes


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
