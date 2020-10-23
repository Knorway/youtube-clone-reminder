const express = require('express');
const { render, send, then } = require('../controllers/globalController');
const { multerVideo } = require('../middleware');

const globalRouter = express.Router();

// GET
globalRouter.get('/', render.home);
globalRouter.get('/join', render.join);
globalRouter.get('/login', render.login);
globalRouter.get('/logout', then.logout);
globalRouter.get('/search', render.search);
globalRouter.get('/upload', render.upload);
globalRouter.get('/profile/:id', render.profile);
globalRouter.get('/edit-profile', render.editProfile);
globalRouter.get('/change-password', render.changePassword);

// POST
globalRouter.post('/join', send.join, then.logLocalIn);
globalRouter.post('/login', then.logLocalIn);
globalRouter.post('/upload', multerVideo, send.uploadVideo);

module.exports = globalRouter;
