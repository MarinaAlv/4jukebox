const express = require('express');
const app = express();
const PORT = 3000;
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(require('morgan')('dev'));
app.use(express.json());

app.post('/playlist', async (req, res, next) => {
  try {
    const {track, owner, ownerId} = req.body;

    const playlist = await prisma.playlist.create({
      data: {
        owner: {connect: {id: ownerId}},
        tracks: {
          connect: track.map((trackId) => ({id: trackId})),
        },
      },
      include: {
        owner: true,
        tracks: true,
      },
    });

    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
