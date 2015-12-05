var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = Schema({
	name: { type: String, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },  //NEED TO ENCRYPT THIS!!!!!
	email: {type: String, required: true},
	userAvatar: { type: String },
	notifications: { type: Number },
	userSettings: {},
	conversations: [{}],
	Friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
});

module.exports = mongoose.model('Users', Users);