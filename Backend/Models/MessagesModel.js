var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Messages = Schema([{
	fromName: { type: String, required: true },
	fromAvatar: { type: String },
	content: { type: String, required: true },
	Time: { type: Date, default: Date.now }
}]);

module.exports = mongoose.model('Messages', Messages);