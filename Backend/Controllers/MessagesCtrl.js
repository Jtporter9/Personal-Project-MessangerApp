var Message = require('../Models/MessagesModel');


module.exports = {

	addMessage: function (req, res) {
		var newMessage = new Message(req.body);
		newMessage.save(function (err, result) {
			if (err) return res.status(500).send(err);
			else res.send(result);
		});
	},
	findMessage: function (req, res, next) {
		Message.find().then(function (Message) {
			res.send(Message);
		})
	},
	
}