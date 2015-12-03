var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = Schema({
	name: { type: String, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },  //NEED TO ENCRYPT THIS!!!!!
	userAvatar: { type: String },
	userSettings: {},
	conversations: [{}],
	Friends: [
		// {
		// 	name: { type: String, required: true },
		// 	username: { type: String, unique: true, required: true },
		// 	userAvatar: { type: Image },
		// 	status: { type: Boolean }
		// }
		]
});

module.exports = mongoose.model('Users', Users);