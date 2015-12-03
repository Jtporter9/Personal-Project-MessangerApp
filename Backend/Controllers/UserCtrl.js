var User = require('../Models/UsersModel');


module.exports = {

	addUser: function (req, res) {
		var newUser = new User(req.body);
		newUser.save(function (err, result) {
			if (err) return res.status(500).send(err);
			else res.send(result);
		});
	},
	findUser: function (req, res, next) {
		User.find().then(function (user) {
			res.send(user);
		})
	},
	updateUser: function (req, res, next) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err, updatedUser) {
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