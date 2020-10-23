const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	role: {
		type: Number,
		default: 0,
	},
	avatarUrl: String,
	githubId: Number,
	videos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video',
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema);

module.exports = User;
