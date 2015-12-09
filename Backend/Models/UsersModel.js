var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = Schema({
	facebookId: { type: Number },
	name: { type: String, required: true },
	username: { type: String, unique: true },
	password: { type: String },  //NEED TO ENCRYPT THIS!!!!! Hash it!!!
	email: { type: String },
	userAvatar: { type: String },
	notifications: { type: Number },
	about: { type: String },
	status: { type: Boolean },
	userSettings: {},
	conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' }],
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
});

module.exports = mongoose.model('Users', Users);