// Dependencies
var express = require('express');


var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var flash = require('connect-flash');
var moment = require('moment');

// ROUTES //
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
	callbackURL: '/auth/facebook/callback',
	// profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'username', 'displayName', 'about', 'gender']
}, function (token, refreshToken, profile, done) {
	User.findOne({
		'facebookId': profile.id
	}, function (findErr, foundUser) {
		if (findErr) return done(findErr, false);
		if (!foundUser) {
			var newUser = {
				name: profile.displayName,
				facebookId: profile.id,
			};
			User.create(newUser, function (createErr, createdUser) {
				if (createErr) return done(createErr, false);
				userId = createdUser._id;
				return done(null, createdUser);
			})
		} else {
			userId = foundUser._id;
			return done(null, foundUser);
		};
	});
}));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook'
	), function (req, res) {
		if (req.session.passport.user.facebookId) {
			res.redirect('/#/profile/' + req.session.passport.user._id);
			res.send(req.session.passport.user._id);
		}
		else {
			res.redirect('/#/login');
		}
		console.log('current users ID !!:', req.session.passport.user._id);
	});
	
/////////////////////////////////////////////////
//////////// Passport Oauth GOOGLE///////////////
/////////////////////////////////////////////////

var googleKeys = require('./googleKeys');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var auth = require('./auth');

passport.use(new GoogleStrategy({
	clientID: googleKeys.googleId,
	clientSecret: googleKeys.googleSecret,
	callbackURL: '/auth/google/callback'
},
	function (req, accessToken, refreshToken, profile, done) {
        User.findOne({ 'googleId': profile.id }, function (err, user) {
            if (user) {
                // profile._json.image.url = profile._json.image.url.replace('?sz=50', '');
                console.log('Google user found in db');
                // if (user.avatar !== profile._json.image.url) {
                //     user.avatar = profile._json.image.url;
                // }
                // user.save();
                done(null, user);
            } else {
                console.log('Google user not found in db');

                user = new User()
                user.googleId = profile.id;
                user.token = accessToken;
                user.name = profile.displayName;
                user.avatar = profile._json.image.url;
                user.email = profile.emails[0].value;
                // edit img url to not be just 50px //
                // user.avatar = user.avatar.replace('?sz=50', '');
                console.log('New user created: ', user);

                user.save();
                done(null, user);
            }
        });
    }));

app.use('/auth', auth)


app.get('/test', function (req, res, next) {
	console.log(req.user._id);
	res.redirect('/#/profile/' + req.user._id);
})

//////////////////////////////////////////////
//////////////// PASSPORT ///////////////////
////////////////////////////////////////////

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

// Mongoose //
var mongoUri = "mongodb://localhost:27017/Chatroom";



// Express Middleware //
app.use(bodyParser.json());
app.use(cors());

// Connetions //
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log("Successsfully connected to mongodb");
});

app.use(express.static(__dirname + '/Frontend'));

////////////////////////////////////
/////////// SOCKET ON /////////////
//////////////////////////////////

// SOCKET.IO
var http = require('http').Server(app);
var socketio = require('socket.io');

app.get('/auth/currentuser', function (req, res, next) {
	res.send(req.user)
})

app.post('/api/users', UserCtrl.addUser);
app.get('/api/users', UserCtrl.findUser);
app.get('/api/users/:id', UserCtrl.findUserById);
app.delete('/api/users/:id', UserCtrl.deleteUser);
app.put('/api/users/:id', UserCtrl.updateUser);
app.put('/api/usersInfo/:id', UserCtrl.updateUserInfo);

// Endpoints Messages //

app.post('/api/messages', MessagesCtrl.addMessage);
app.get('/api/messages', MessagesCtrl.findMessage);

// Endpoints Conversations //

app.post('/api/conversations', ConversationsCtrl.addConversation);
app.get('/api/conversations', ConversationsCtrl.findConversation);
app.put('/api/conversations/:id', MessagesCtrl.addMessage);
app.get('/api/conversations/:id', ConversationsCtrl.findConversationById);
app.delete('/api/conversations/:id', ConversationsCtrl.deleteConversation);

var io = socketio(http);

io.on('connection', function (socket) {
	// console.log('a user has connected');
	socket.on('message', function (messages) {
		io.sockets.emit('messageFromSockets', messages);
	});
	socket.on('CurrentUsersConvos', function (convos) {
		io.sockets.emit('CurrentUsersConvosFromSockets', convos);
	});
	socket.on('friendStatus', function (status) {
		io.sockets.emit('friendsStatus', status);
	});
});


// PORT //
http.listen(3000, function () {
	console.log('listening on port: 3000');
});