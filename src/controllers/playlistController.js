const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all playlists for logged-in user
async function getPlaylists(req, res) {
  const playlists = await prisma.playlist.findMany({
    where: { ownerId: req.user.id },
  });
  res.json(playlists);
}

// Create a new playlist
async function createPlaylist(req, res) {
  const { name, description, trackIds } = req.body;

  const playlist = await prisma.playlist.create({
    data: {
      name,
      description,
      ownerId: req.user.id,
      tracks: {
        connect: trackIds.map(id => ({ id })), // Connect the specified tracks
      },
    },
  });

  res.status(201).json(playlist);
}

// Get specific playlist by ID
async function getPlaylist(req, res) {
  const { id } = req.params;
  const playlist = await prisma.playlist.findUnique({
    where: { id: parseInt(id) },
    include: { tracks: true }, // Include tracks in the response
  });

  if (!playlist || playlist.ownerId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json(playlist);
}

module.exports = { getPlaylists, createPlaylist, getPlaylist };
