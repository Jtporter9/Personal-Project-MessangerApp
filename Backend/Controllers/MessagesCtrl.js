var Message = require('../Models/MessagesModel');
var Conversation = require('../Models/ConversationsModel');

module.exports = {

	addMessage: function (req, res) {
		var newMessage = new Message(req.body);
		var conversationId = req.params.id;
		newMessage.save(function (err, result) {
			var newMessageId = result._id;
			Conversation.update({ _id: conversationId },
				{ $push: { messages: newMessageId } }, function (err, result) {
					if (err) {
						res.status(500).send(err);
					} else {
						res.status(200).send("new message Saved", result)
					}
				})

		});
	},
	findMessage: function (req, res, next) {
		Message.find().then(function (Message) {
			res.send(Message);
		})
	},

} //5666045c10bac0a25bc8b79a