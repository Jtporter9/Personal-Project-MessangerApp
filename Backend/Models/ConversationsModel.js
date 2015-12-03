var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conversations = Schema([{
	with: { type: String },
	newMessages: { type: Number },
	date: { type: Date, default: Date.now }
}]);

module.exports = mongoose.model('Conversations', Conversations);