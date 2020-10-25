const Video = require('../models/Video');
const Comment = require('../models/Comment');

module.exports.send = {};

exports.send.addComment = async (req, res) => {
	const {
		params: { id },
		body: { data: comment },
		user,
	} = req;
	console.log(id, user.id, comment);
	try {
		const video = await Video.findById(id);
		const newComment = await Comment.create({
			text: comment,
			creator: user.id,
		});
		video.comments.push(newComment.id);
		video.save();
	} catch (error) {
		console.log(error);
		res.status(400);
	}
	res.end();
};
