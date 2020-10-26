const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const globalRouter = require('./routers/globalRouter');
const videoRouter = require('./routers/videoRouter');
const { localsMiddleware } = require('./middleware');
const passport = require('passport');
const sesseion = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const apiRouter = require('./routers/apiRouter');
require('./passport');

const app = express();

const cookieStore = mongoStore(sesseion);

dotenv.config();

app.set('view engine', 'njk');

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: true,
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));
app.use(
	sesseion({
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: false,
		store: new cookieStore({ mongooseConnection: mongoose.connection }),
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/api', apiRouter);

module.exports = app;
