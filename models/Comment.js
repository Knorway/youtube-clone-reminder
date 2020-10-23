const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: 'text is required',
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	videos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video',
		},
	],
	creator: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
