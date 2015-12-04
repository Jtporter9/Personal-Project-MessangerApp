var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conversations = Schema({
  	people: [{type: String, required: true}], // type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true 
	numNewMessages: { type: Number, default: 0 },
	date: { type: Date, default: Date.now },
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages'}]
});

module.exports = mongoose.model('Conversations', Conversations);