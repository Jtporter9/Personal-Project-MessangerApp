var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conversations = Schema({
  	with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
	numNewMessages: { type: Number, default: 0 },
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversations', Conversations);