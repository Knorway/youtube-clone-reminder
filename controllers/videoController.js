const Video = require('../models/Video');

module.exports.render = {};
module.exports.send = {};

// render
exports.render.videoDetail = async (req, res) => {
	const {
		params: { id },
		user,
	} = req;
	const video = await Video.findById(id).populate('creator');
	res.render('videoDetail', { video, user });
};
exports.render.editVideo = async (req, res) => {
	const { id } = req.params;
	try {
		const video = await Video.findById(id).populate('creator');
		if (video.creator.id !== req.user.id) {
			throw Error();
		} else {
			res.render('editVideo', { video });
		}
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
};

// send
exports.send.editVideo = async (req, res) => {
	const {
		body: { title, description },
		params: { id },
	} = req;
	try {
		const video = await Video.findById(id);
		if (String(video.creator) !== req.user.id) {
			throw Error();
		} else {
			await Video.findByIdAndUpdate({ _id: id }, { title, description });
			res.redirect(`/videos/${id}`);
		}
	} catch (err) {
		console.log(err);
		res.redirect(`/`);
	}
};
exports.send.deleteVideo = async (req, res) => {
	const { id } = req.params;
	try {
		const video = await Video.findById(id);
		// console.log(video.creator.toHexString() === req.user.id);
		if (String(video.creator) !== req.user.id) {
			throw Error();
		} else {
			await Video.findByIdAndRemove(id);
		}
	} catch (error) {
		console.log(error);
	}
	res.redirect('/');
};
