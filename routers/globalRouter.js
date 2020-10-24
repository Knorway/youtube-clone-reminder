const express = require('express');
const passport = require('passport');
const { render, send, then } = require('../controllers/globalController');
const {
	multerVideo,
	onlyPublic,
	onlyPrivate,
	onlyAdmin,
} = require('../middleware');

const globalRouter = express.Router();

// GET
globalRouter.get('/', render.home);
globalRouter.get('/join', onlyPublic, render.join);
globalRouter.get('/login', onlyPublic, render.login);
globalRouter.get('/logout', onlyPrivate, then.logout);
globalRouter.get('/search', render.search);
globalRouter.get('/upload', onlyPrivate, render.upload);
globalRouter.get('/profile/:id', render.profile);
globalRouter.get('/edit-profile', onlyPrivate, render.editProfile);
globalRouter.get('/change-password', onlyPrivate, render.changePassword);

globalRouter.get('/admin', onlyAdmin, render.admin);

globalRouter.get('/auth/github', passport.authenticate('github'));
globalRouter.get(
	'/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(_, res) => res.redirect('/')
);

// POST
globalRouter.post('/join', send.join, then.logLocalIn);
globalRouter.post('/login', then.logLocalIn);
globalRouter.post('/upload', onlyPrivate, multerVideo, send.uploadVideo);
globalRouter.post('/edit-profile', onlyPrivate, send.editProfile);
globalRouter.post('/change-password', onlyPrivate, send.changePassword);

module.exports = globalRouter;
