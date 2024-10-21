const express = require('express');
const { getPlaylists, createPlaylist, getPlaylist } = require('../controllers/playlistController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Protect playlist routes with authentication middleware
router.use(authenticate);

// Route to get all playlists for the logged-in user
router.get('/', getPlaylists);

// Route to create a new playlist
router.post('/', createPlaylist);

// Route to get a specific playlist by ID
router.get('/:id', getPlaylist);

module.exports = router;
