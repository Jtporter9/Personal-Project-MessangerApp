
///// Passport Oauth////////
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Dependencies
var express = require('express');
var cookieParser = require('cookie-parser');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var flash    = require('connect-flash');

var UserCtrl = require('./Backend/Controllers/UserCtrl.js')
var keys = require('./keys');

app.use(session({ secret: 'IgotapickleIgotapickleheyheyhey' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: keys.facebookId,
	clientSecret: keys.facebookSecret,
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function (token, refreshToken, profile, done) {
	return done(null, profile);
}));

///////Facebook auth endpoints//////////
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/#/profile',
	failureRedirect: '/#/login'
}), function (req, res) {
	console.log(req.session);
});

passport.serializeUser(function (user, done) {
	done(null, user);
});

var requireAuth = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/auth/facebook')
}

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

app.get('/me', requireAuth, function (req, res, next) {
	var currentLoggedInUserOnSession = req.user;
	res.send(currentLoggedInUserOnSession);
})

//Mongoose
var mongoUri = "mongodb://localhost:27017/Chatroom";



// Express Middleware
app.use(bodyParser.json());
app.use(cors());

// Connetions
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log("Successsfully connected to mongodb");
});

app.use(express.static(__dirname + '/Frontend'));

// Endpoints

app.post('/api/users', UserCtrl.addUser);
app.get('/api/users', UserCtrl.findUser);
app.delete('/api/users/:id', UserCtrl.deleteUser);
app.put('/api/users/:id', UserCtrl.updateUser);



//listening
app.listen(3000, function () {
	console.log('listening on port: 3000');
});