const express = require('express');
const { getTracks, getTrack } = require('../controllers/trackController');

const router = express.Router();

// Route to get all tracks
router.get('/', getTracks);

// Route to get a specific track by ID
router.get('/:id', getTrack);

module.exports = router;
