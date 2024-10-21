const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Seed the database with initial data
async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      password: 'hashed_password1', // Ensure to hash the password before saving
    },
  });

  // Create tracks
  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const track = await prisma.track.create({
      data: {
        name: `Track ${i}`,
      },
    });
    tracks.push(track);
  }

  // Create a playlist and assign tracks
  await prisma.playlist.create({
    data: {
      name: 'My Playlist',
      description: 'A sample playlist',
      ownerId: user1.id,
      tracks: {
        connect: tracks.map(track => ({ id: track.id })), // Connect the created tracks
      },
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect the Prisma client
  });
