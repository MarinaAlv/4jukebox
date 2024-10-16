const prisma = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function main() {
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
      },
    });
    user.push(user);
  }
  const tracks = [];
  for (let i = 0; i < 20; i++) {
    const track = await prisma.track.create({
      data: {
        title: faker.lorem.words(3),
        artist: faker.name.firstName(),
      },
    });
    tracks.push(track);
  }
  for (let i = 0; i < 10; i++) {
    const iser = users[Math.floor(Math.random() * users.lenght)];
    const playlist = await prisma.playlist.create({
      data: {
        title: faker.lorem.words(2),
        userId: user.id,
        tracks: {
          create: tracks
            .sort(() => 0.5 - Math.random())
            .slice(0, 8)
            .map((track) => ({trackId: track.id})),
        },
      },
    });
  }
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
