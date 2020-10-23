const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');

dotenv.config();

module.exports.only = {};

exports.only.public = '';
exports.only.user = '';
exports.only.admin = '';

module.exports.localsMiddleware = (req, res, next) => {
	res.locals.loggedUser = req.user || null;
	res.locals.pagetitle = 'VideoLog';
	next();
};

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: 'ap-northeast-2',
});

const videoMulter = multer({
	storage: multerS3({
		s3,
		acl: 'public-read',
		bucket: 'wetube-reminder/video',
	}),
});

module.exports.multerVideo = videoMulter.single('videoFile');
