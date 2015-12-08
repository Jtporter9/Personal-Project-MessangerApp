var Conversation = require('../Models/ConversationsModel');


module.exports = {

	addConversation: function (req, res) {
		var newConversation = new Conversation(req.body);
		newConversation.save(function (err, result) {
			if (err) return res.status(500).send(err);
			else res.send(result);
		});
	},
	// findConversation: function (req, res, next) {
	// 	Conversation.find().then(function (Conversation) {
	// 		res.send(Conversation);
	// 	})
	// },
	findConversation: function (req, res, next) {
		Conversation.find().populate('messages').populate('people').exec().then(function (conversations, err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(conversations);
			}
		})
	},
	findConversationById: function (req, res, next) {
		Conversation.findById(req.params.id).populate('messages').exec().then(function (conversations, err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(conversations);
			}
		})
	},

	// findConversationById: function (req, res, next) {
	// 	Conversation.findById(req.params.id).then(function (user) {
	// 		res.send(user);
	// 	})
	// },
	deleteConversation: function (req, res, next) {
		Conversation.findByIdAndRemove(req.params.id, req.body, function (err, deletedConversation) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(deletedConversation);
			}
		});
	}
}