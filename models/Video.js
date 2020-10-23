const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'title is required',
	},
	description: String,
	fileUrl: {
		type: String,
		required: 'fileUrl is required',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	views: {
		type: Number,
		default: 0,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
