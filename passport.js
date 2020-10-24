const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');
const dotenv = require('dotenv');
const { auth } = require('./controllers/globalController');

dotenv.config();

passport.use(User.createStrategy());

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GH_ID,
			clientSecret: process.env.GH_SECRET,
			callbackURL: 'http://localhost:4000/auth/github/callback',
		},
		auth.githubCallback
	)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
