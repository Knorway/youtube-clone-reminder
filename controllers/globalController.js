const User = require('../models/User');
const Video = require('../models/Video');
const passport = require('passport');

module.exports.render = {};
module.exports.send = {};
module.exports.then = {};
module.exports.auth = {};

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
exports.render.admin = (req, res) => {
	res.render('layouts/mainAdmin');
};

// send
exports.send.join = async (req, res, next) => {
	const { name, email, password, password2 } = req.body;
	if (password2 !== password2) {
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

exports.send.editProfile = async (req, res) => {
	const { name } = req.body;
	try {
		await User.findByIdAndUpdate(req.user.id, {
			name,
		});
		res.redirect(`/profile/${req.user.id}`);
	} catch (error) {
		console.log(error);
		res.redirect(`/profile/${req.user.id}`);
	}
};

exports.send.changePassword = async (req, res) => {
	const { oldPassword, newPassword, newPassword2 } = req.body;
	try {
		if (newPassword !== newPassword2) {
			res.status(400);
			res.redirect('/change-password');
			return;
		}
		await req.user.changePassword(oldPassword, newPassword);
		res.redirect(`/profile/${req.user.id}`);
	} catch (error) {
		res.status(400);
		res.redirect('/change-password');
		console.log(error);
	}
};

// then
exports.then.logLocalIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
});
exports.then.logout = (req, res) => {
	req.logout();
	req.session.destroy((err) => {
		res.redirect('/');
	});
};

// auth
exports.auth.githubCallback = async (_, __, profile, callback) => {
	const {
		_json: { id, login: name, email, avatar_url },
	} = profile;
	try {
		const user = await User.findOne({ email });
		if (user) {
			user.githubId = id;
			user.save();
			return callback(null, user);
		}
		const newUser = await User.create({
			name,
			email,
			githubId: id,
			avatarUrl: avatar_url,
		});
		return callback(null, newUser);
	} catch (err) {
		callback(err);
		console.log(err);
	}
};
