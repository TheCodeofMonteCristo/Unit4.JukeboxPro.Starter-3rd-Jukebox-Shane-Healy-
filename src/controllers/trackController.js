const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all tracks
async function getTracks(req, res) {
  const tracks = await prisma.track.findMany();
  res.json(tracks);
}

// Get specific track by ID
async function getTrack(req, res) {
  const { id } = req.params;
  const track = await prisma.track.findUnique({
    where: { id: parseInt(id) },
    include: { playlists: true }, // Include playlists that contain this track
  });

  if (!track) {
    return res.status(404).json({ message: 'Track not found' });
  }

  res.json(track);
}

module.exports = { getTracks, getTrack };
