
// Dependencies
var express = require('express');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var flash = require('connect-flash');
var UserCtrl = require('./Backend/Controllers/UserCtrl.js')
var MessagesCtrl = require('./Backend/Controllers/MessagesCtrl.js')
var ConversationsCtrl = require('./Backend/Controllers/ConversationsCtrl.js')
var User = require('./Backend/Models/UsersModel')
var keys = require('./keys');

///////////////////////////////////////////////
////////// Passport Oauth Facebook/////////////
///////////////////////////////////////////////

var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(session({ secret: 'IgotapickleIgotapickleheyheyhey' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: keys.facebookId,
	clientSecret: keys.facebookSecret,
	callbackURL: '/auth/facebook/callback'
}, function (token, refreshToken, profile, done) {
	User.findOne({
		'facebookId': profile.id
	}, function (findErr, foundUser) {
		if (findErr) return done(findErr, false);
		if (!foundUser) {
			var newUser = {
				name: profile.displayName,
				facebookId: profile.id,
				// email: profile.emails[0].value
			};
			User.create(newUser, function (createErr, createdUser) {
				console.log(profile.id, createdUser.admin);
				if (createErr) return done(createErr, false);
				userId = createdUser._id;
				return done(null, createdUser);
			})
		} else {
			userId = foundUser._id;
			console.log(userId);
			return done(null, foundUser);
		};
	});
}));
//////////////////facebook endpoints///////////
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook'
// , {
// 	successRedirect: '/#/profile + req.session.passport.user._id',
// 	failureRedirect: '/#/login'
// }
), function (req, res) {
	if (req.session.passport.user.facebookId) {
		res.redirect('/#/profile/' + req.session.passport.user._id);
	} 
	else {
		res.redirect('/#/login');
	}
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

// Endpoints Users

app.post('/api/users', UserCtrl.addUser);
app.get('/api/users', UserCtrl.findUser);
app.get('/api/users/:id', UserCtrl.findUserById);
app.delete('/api/users/:id', UserCtrl.deleteUser);
app.put('/api/users/:id', UserCtrl.updateUser);

// Endpoints Messages

app.post('/api/messages', MessagesCtrl.addMessage);
app.get('/api/messages', MessagesCtrl.findMessage);

// Endpoints Conversations

app.post('/api/conversations', ConversationsCtrl.addConversation);
app.get('/api/conversations', ConversationsCtrl.findConversation);
app.put('/api/conversations/:id', MessagesCtrl.addMessage);
app.get('/api/conversations/:id', ConversationsCtrl.findConversationById);
app.delete('/api/conversations/:id', ConversationsCtrl.deleteConversation);



//listening
app.listen(80, function () {
	console.log('listening on port: 80');
});