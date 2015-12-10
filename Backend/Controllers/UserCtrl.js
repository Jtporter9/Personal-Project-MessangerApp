var User = require('../Models/UsersModel');
var mongoose = require('mongoose');
// var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = {

	addUser: function (req, res) {
		var newUser = new User(req.body);
		newUser.save(function (err, result) {
			if (err) res.status(500).send(err);
			else res.send(result);
		});
	},
	findUser: function (req, res, next) {
		User.find().populate('friends')
			.populate('conversations').exec().then(function (user, err) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.send(user);
				}
			})
	},
	findUserById: function (req, res, next) {
		User.findById(req.params.id)
			.populate('friends')
		.populate('conversations')
			// .populate({
			// 	path: 'conversations',
			// 	populate: { path: 'people' }
			// })
			.exec().then(function (user, err) { 
				// console.log('USER:', user);
				if (err) {
					res.status(500).send(err);
				} else {
					// user.conversations.forEach(function (conversation, i) {
					// 	conversation.people.forEach(function (person, index) {
					// 		User.findById(person, function (err, userObj) {
					// 			user.conversations[i].people[index] = userObj;
					// 			// console.log('this is user object',userObj);
					// 			// res.send(userObj);
					// 		})
					// 	})
					// });
					// console.log('this is the user', user);
					res.send(user);
				}
			})
	},
	updateUser: function (req, res, next) {
		User.findByIdAndUpdate(req.params.id, {
			$push: {
				'conversations': mongoose.Types.ObjectId(req.body.conversations)
			}
		}, function (err, updatedUser) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(updatedUser);
			}
		})
	},

	deleteUser: function (req, res, next) {
		User.findByIdAndRemove(req.params.id, req.body, function (err, deletedUser) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(deletedUser);
			}
		});
	}
}