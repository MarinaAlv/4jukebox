const express = require('express');
const bosyParser = require('body-parser');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {id: parseInt(req.params.id)},
    include: {playlists: true},
  });
  res.json(user);
});

app.get('/playlists', async (req, res) => {
  const playlist = await prisma.playlist.findMany({
    include: {tracks: {include: {track: true}}},
  });
  res.json(playlists);
});

app.post('/playlists', async (req, res) => {
  const {title, userIds} = req.body;
  const playlist = await prisma.playlist.create({
    data: {
      title,
      userId,
      tracks: {
        create: trackIds.map((trackId) => ({trackId})),
      },
    },
  });
  res.json(playlist);
});

app.get('/playlists/:id', async (req, res) => {
  const playlist = await prisma.playlist.findUnique({
    where: {id: parseInt(req.params.id)},
    include: {tracks: {include: {track: true}}},
  });
});

app.get('/tracks', async (req, res) => {
  const tracks = await prisma.track.findMany();
  res.json(tracks);
});

app.get('/tracks/:id', async (req, res) => {
  const track = await prisma.track.findUnique({
    where: {id: parseInt(req.params.id)},
  });
  res.json(track);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Serveris running on port ${port}');
});
