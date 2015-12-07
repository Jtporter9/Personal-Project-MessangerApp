var User = require('../Models/UsersModel');


module.exports = {

	addUser: function (req, res) {
		var newUser = new User(req.body);
		newUser.save(function (err, result) {
			if (err) res.status(500).send(err);
			else res.send(result);
		});
	},
	// findUser: function (req, res, next) {
	// 	User.find().then(function (user) {
	// 		res.send(user);
	// 	})
	// },
	findUser: function (req, res, next) {
		User.find().populate('friends').populate('conversations').exec().then(function (user, err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(user);
			}
		})
	},
	findUserById: function (req, res, next) {
		User.findById(req.params.id).populate('friends').populate('conversations').exec().then(function (user, err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(user);
			}
		})
	},
	// findUserById: function (req, res, next) {
	// 	User.findById(req.params.id).then(function (user) {
	// 		res.send(user);
	// 	})
	// },
	updateUser: function (req, res, next) {
		User.findByIdAndUpdate(req.params.id, req.body).populate('friends').populate('conversations').exec().then(function (err, updatedUser) {
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