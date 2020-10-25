const express = require('express');
const { send } = require('../controllers/apiController');

const apiRouter = express.Router();

// /api

// POST
apiRouter.post('/:id/comment', send.addComment);

module.exports = apiRouter;
