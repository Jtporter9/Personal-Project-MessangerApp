angular.module('messangerApp').service('chatroomService', function ($http) {

///USER CALLS/////
	this.findUser = function () {
		return $http.get('/api/users').then(function (response) {
			// console.log(response.data);
			return response.data;

		});
    }

	this.findCurrentUser = function (id) {
		return $http.get('/api/users' + id).then(function (response) {
			// console.log(response.data);
			return response.data;

		});
    }

    this.addUser = function (newUserObj) {
		return $http.post('/api/users', newUserObj).then(function (response) {
			return response;
		})
    }

    this.deleteUser = function (id) {
		return $http.delete('/api/users/' + id).then(function (response) {
			return response;
		})
    }

	this.updateUser = function (product) {
		return $http.put('/api/users/' + product._id, product)
    }
	
	
	///////////Convo calls////////
	
	  this.addConvo = function (newConvoObj) {
		return $http.post('/api/conversations', newConvoObj).then(function (response) {
			return response;
		})
    }
	this.findConvos = function () {
		return $http.get('/api/conversations').then(function (response) {
			return response.data;

		});
    }
	
	
	
	//fake data
	
	this.usersInfo = {
		name: 'J. Tanner Porter',
		about: "Blah Blah blah blah blah. Blah Blah blah blah blah,Blah Blah blah blah blah.",
		username: 'Jtporter9',
		userEmail: 'jtporter9@gmail.com',
		userPassword: 'password123',
		// userPicture: 'images/2015-03-23 06.42.58.jpg'
	}


	this.messages = [
		{
			from: 'Freddie Davis',
			content: 'Dude, Tanner are you coming tonight?',
			time: new Date
		},
		{
			from: 'Zac',
			content: 'I am, yeah',
			time: new Date
		},
		{
			from: 'You',
			content: 'Yeah I can be there',
			time: new Date,
			id: 1
		},
		{
			from: 'Zac',
			content: 'Actually my wife wont let me',
			time: new Date
		},
		{
			from: 'Taylor Rowley',
			content: 'I can\'t',
			time: new Date
		},
		{
			from: 'You',
			content: 'Dude what!?',
			time: new Date,
			id: 1
		},
		{
			from: 'You',
			content: 'It\'s okay I\'m just kidding',
			time: new Date,
			id: 1
		},
		{
			from: 'Taylor Rowley',
			content: 'Haha okay.',
			time: new Date
		},
	];

	// this.conversations = [
	// 	{
	// 		from: ['Freddie Davis', 'Zac Christianson', 'Taylor Rowley'],
	// 		date: new Date,
	// 		messageCount: 33,
	// 	},
	// 	{
	// 		from: ['Tobee Gunter'],
	// 		date: new Date,
	// 		messageCount: 54
	// 	}, {
	// 		from: ['Mom', 'Daddy'],
	// 		date: new Date,
	// 		messageCount: 21
	// 	}, {
	// 		from: ['Coach Burbidge'],
	// 		date: new Date,
	// 		messageCount: 11
	// 	}, {
	// 		from: ['Rey'],
	// 		date: new Date,
	// 		messageCount: 82
	// 	}, {
	// 		from: ['Zac'],
	// 		date: new Date,
	// 		messageCount: 12
	// 	}, {
	// 		from: ['Luke Skywalker'],
	// 		date: new Date,
	// 		messageCount: 81
	// 	},

	// ];
	this.friends = [
		{
			name: 'Freddie Davis',
			email: 'fpdavis4@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Zac Christianson',
			email: 'zaclax29@gmail.com',
			status: 'Online'
		}, {
			name: 'Tobee Gunter',
			email: 'sobee4@gmail.com',
			status: 'Online'
		}, {
			name: 'Pete Bradford',
			email: 'peter26@gmail.com',
			status: 'Offline'
		}, {
			name: 'Cody Porter',
			email: 'codyWadePorter@gmail.com',
			status: 'Online'
		}, {
			name: 'Freddie Davis',
			email: 'fpdavis4@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Zac Christianson',
			email: 'zaclax29@gmail.com',
			status: 'Online'
		}, {
			name: 'Tobee Gunter',
			email: 'sobee4@gmail.com',
			status: 'Online'
		}, {
			name: 'Pete Bradford',
			email: 'peter26@gmail.com',
			status: 'Offline'
		}, {
			name: 'Cody Porter',
			email: 'codyWadePorter@gmail.com',
			status: 'Online'
		}, {
			name: 'Freddie Davis',
			email: 'fpdavis4@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Zac Christianson',
			email: 'zaclax29@gmail.com',
			status: 'Online'
		}, {
			name: 'Tobee Gunter',
			email: 'sobee4@gmail.com',
			status: 'Online'
		}, {
			name: 'Pete Bradford',
			email: 'peter26@gmail.com',
			status: 'Offline'
		}, {
			name: 'Cody Porter',
			email: 'codyWadePorter@gmail.com',
			status: 'Online'
		}, {
			name: 'Freddie Davis',
			email: 'fpdavis4@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Zac Christianson',
			email: 'zaclax29@gmail.com',
			status: 'Online'
		}, {
			name: 'Tobee Gunter',
			email: 'sobee4@gmail.com',
			status: 'Online'
		}, {
			name: 'Pete Bradford',
			email: 'peter26@gmail.com',
			status: 'Offline'
		}, {
			name: 'Cody Porter',
			email: 'codyWadePorter@gmail.com',
			status: 'Online'
		}, {
			name: 'Freddie Davis',
			email: 'fpdavis4@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Zac Christianson',
			email: 'zaclax29@gmail.com',
			status: 'Online'
		}, {
			name: 'Tobee Gunter',
			email: 'sobee4@gmail.com',
			status: 'Online'
		}, {
			name: 'Pete Bradford',
			email: 'peter26@gmail.com',
			status: 'Offline'
		}, {
			name: 'Cody Porter',
			email: 'codyWadePorter@gmail.com',
			status: 'Online'
		}
	];


});