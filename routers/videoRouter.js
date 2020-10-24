const express = require('express');
const { render, send } = require('../controllers/videoController');
const { onlyPrivate } = require('../middleware');

const videoRouter = express.Router();

// /videos

// GET
videoRouter.get('/:id', render.videoDetail);
videoRouter.get('/:id/edit', onlyPrivate, render.editVideo);

// POST
videoRouter.post('/:id/edit', onlyPrivate, send.editVideo);
videoRouter.post('/:id/delete', onlyPrivate, send.deleteVideo);

module.exports = videoRouter;
