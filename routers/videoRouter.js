const express = require('express');
const { render, send } = require('../controllers/videoController');

const videoRouter = express.Router();

// /videos

// GET
videoRouter.get('/:id', render.videoDetail);
videoRouter.get('/:id/edit', render.editVideo);

// POST
videoRouter.post('/:id/edit', send.editVideo);
videoRouter.post('/:id/delete', send.deleteVideo);

module.exports = videoRouter;
