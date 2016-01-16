var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

moment().startOf('hour').fromNow(); 

var Messages = Schema({
	fromName: { type: String, required: true },
	fromAvatar: { type: String },
	content: { type: String, required: true },
	time: { type: String}
});

module.exports = mongoose.model('Messages', Messages);