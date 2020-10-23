const User = require('../models/User');
const Video = require('../models/Video');
const passport = require('passport');

module.exports.render = {};
module.exports.send = {};
module.exports.then = {};

// render
exports.render.home = async (req, res) => {
	const videos = await Video.find({}).sort({ _id: -1 });
	res.render('home', { videos });
};
exports.render.join = (req, res) => {
	res.render('join');
};
exports.render.login = (req, res) => {
	res.render('login');
};
exports.render.search = async (req, res) => {
	const { keyword } = req.query;
	let videos = [];
	try {
		videos = await Video.find({
			title: { $regex: keyword, $options: 'i' },
		});
	} catch (error) {
		console.log(error);
	}
	res.render('search', { keyword, videos });
};
exports.render.upload = (req, res) => {
	res.render('upload');
};
exports.render.profile = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	res.render('profile', { user });
};
exports.render.editProfile = async (req, res) => {
	const { user } = req;
	res.render('editProfile', { user });
};
exports.render.changePassword = (req, res) => {
	res.render('changePassword');
};

// send
exports.send.join = async (req, res, next) => {
	const { name, email, password, password2 } = req.body;
	if (!password2 === password2) {
		res.staus(400);
		res.render('join');
	} else {
		try {
			const user = await User({
				name,
				email,
			});
			await User.register(user, password);
			next();
		} catch (err) {
			console.log(err);
			res.redirect('/');
		}
	}
};

exports.send.uploadVideo = async (req, res) => {
	const {
		body: { title, description },
		file: { location },
	} = req;
	try {
		const newVideo = await Video.create({
			fileUrl: location,
			title,
			description,
			creator: req.user.id,
		});
		req.user.videos.push(newVideo.id);
		req.user.save();
		res.redirect(`/videos/${newVideo.id}`);
	} catch (err) {
		console.log(err);
		res.redirect('/upload');
	}
};

// then
exports.then.logLocalIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
});
exports.then.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};
