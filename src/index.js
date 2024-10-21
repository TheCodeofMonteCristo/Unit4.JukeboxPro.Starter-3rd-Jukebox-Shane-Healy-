const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const trackRoutes = require('./routes/trackRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/playlists', playlistRoutes); // Playlist routes
app.use('/api/tracks', trackRoutes); // Track routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
