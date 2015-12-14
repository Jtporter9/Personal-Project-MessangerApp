var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = Schema({
	facebookId: { type: Number },
	name: { type: String, required: true },
	username: { type: String default:"Please enter a username" },
	password: { type: String },  //NEED TO ENCRYPT THIS!!!!! Hash it!!!
	email: { type: String, default:"Please enter your email" },
	userAvatar: { type: String},
	notifications: { type: Number },
	about: { type: String, default:"Please enter something about you." },
	Userstatus: { type: Boolean },
	userSettings: {},
	conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' }],
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
});
module.exports = mongoose.model('Users', Users);