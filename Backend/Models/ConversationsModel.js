var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var Conversations = Schema({
	people: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
	numNewMessages: { type: Number, default: 0 },
	date: { type: Date, default: Date.now },
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages' }]
});

module.exports = mongoose.model('Conversations', Conversations);