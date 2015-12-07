var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = Schema({
	name: { type: String, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },  //NEED TO ENCRYPT THIS!!!!! Hash it!!!
	email: { type: String, required: true },
	userAvatar: { type: String },
	notifications: { type: Number },
	status: { type: Boolean },
	userSettings: {},
	conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' }],
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}]
});

module.exports = mongoose.model('Users', Users);
