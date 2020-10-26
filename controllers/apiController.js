const Video = require('../models/Video');
const Comment = require('../models/Comment');

module.exports.send = {};

exports.send.addComment = async (req, res) => {
	if (req.user) {
		const {
			params: { id },
			body: { data: comment },
			user,
		} = req;
		try {
			const video = await Video.findById(id);
			const newComment = await Comment.create({
				text: comment,
				creator: user.id,
			});
			video.comments.push(newComment.id);
			video.save();
			res.json({ success: true, id: newComment.id });
		} catch (error) {
			console.log(error);
			res.status(400);
		}
	} else {
		res.json({ error: 'login required', redirect: '/login' });
	}
};

exports.send.deleteComment = async (req, res) => {
	if (req.user) {
		const { data } = req.body;
		try {
			await Comment.findByIdAndDelete(data);
		} catch (error) {
			console.log(error);
		} finally {
			res.end();
		}
	} else {
		res.redirect('/');
	}
};
exports.send.plusView = async (req, res) => {
	const { id } = req.params;
	try {
		const video = await Video.findById(id);
		video.views += 1;
		video.save();
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};
