const express = require('express');
const { send } = require('../controllers/apiController');

const apiRouter = express.Router();

// /api

// POST
apiRouter.post('/:id/comment/add', send.addComment);
apiRouter.post('/:id/comment/delete', send.deleteComment);
apiRouter.post('/:id/view/plus', send.plusView);

module.exports = apiRouter;
