angular.module('messangerApp').service('chatroomService', function ($http) {

///USER CALLS/////
	this.findUser = function () {
		return $http.get('/api/users').then(function (response) {
			// console.log(response.data);
			return response.data;

		});
    }

	this.findCurrentUser = function (id) {
		return $http.get('/api/users/' + id).then(function (response) {
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
	this.findCurrentConvo = function (id) {
		return $http.get('/api/conversations/' + id).then(function (response) {
			// console.log(response.data);
			return response.data;

		});
    }
	 this.deleteConvo = function (id) {
      return $http.delete('/api/conversations/' + id).then(function (response) {
        return response;
      })
    }
	
	///////////Message Calls////////////
	
	  this.addMessage = function (newMessageObj) {
		return $http.post('/api/messages', newMessageObj).then(function (response) {
			return response;
		})
    }
	this.findMessage = function () {
		return $http.get('/api/messages').then(function (response) {
			return response.data;

		});
    }
	
	//fake data
	
	this.usersInfo = {
		name: 'J. Tanner Porter',
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at nibh et arcu luctus porta sed non eros. Pellentesque imperdiet malesuada enim in cursus. Aenean laoreet a elit quis efficitur. Nulla interdum nisl sit amet libero luctus, eu convallis odio volutpat. Suspendisse potenti. Nunc ut elit enim.",
		username: 'Jtporter9',
		userEmail: 'jtporter9@gmail.com',
		userPassword: 'password123',
		// userAvatar: 'images/default-profile-thumb.png'
	}


	// this.messages = [
	// 	{
	// 		from: 'Freddie Davis',
	// 		content: 'Dude, Tanner are you coming tonight?',
	// 		time: new Date
	// 	},
	// 	{
	// 		from: 'Zac',
	// 		content: 'I am, yeah',
	// 		time: new Date
	// 	},
	// 	{
	// 		from: 'You',
	// 		content: 'Yeah I can be there',
	// 		time: new Date,
	// 		id: 1
	// 	},
	// 	{
	// 		from: 'Zac',
	// 		content: 'Actually my wife wont let me',
	// 		time: new Date
	// 	},
	// 	{
	// 		from: 'Taylor Rowley',
	// 		content: 'I can\'t',
	// 		time: new Date
	// 	},
	// 	{
	// 		from: 'You',
	// 		content: 'Dude what!?',
	// 		time: new Date,
	// 		id: 1
	// 	},
	// 	{
	// 		from: 'You',
	// 		content: 'It\'s okay I\'m just kidding',
	// 		time: new Date,
	// 		id: 1
	// 	},
	// 	{
	// 		from: 'Taylor Rowley',
	// 		content: 'Haha okay.',
	// 		time: new Date
	// 	},
	// ];

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
			name: 'Jose Martinez',
			email: 'josemat@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Carlos',
			email: 'carloseM@gmail.com',
			status: 'Online'
		}, {
			name: 'Sydnee Gunter',
			email: 'sydthekid@gmail.com',
			status: 'Online'
		}, {
			name: 'Jimmy johnson',
			email: 'jimmyJ@gmail.com',
			status: 'Offline'
		}, {
			name: 'Todd Lillywhite',
			email: 'ToddLilly@gmail.com',
			status: 'Online'
		}, {
			name: 'Luis',
			email: 'Luis@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Gabe',
			email: 'Gabe@gmail.com',
			status: 'Online'
		}, {
			name: 'Cam Gunter',
			email: 'Cam@gmail.com',
			status: 'Online'
		}, {
			name: 'Juan Carlos',
			email: 'JuanCarlos@gmail.com',
			status: 'Offline'
		}, {
			name: 'Stuart Porter',
			email: 'Knucklehead/awesomestdad@gmail.com',
			status: 'Online'
		}, {
			name: 'Fred Davis',
			email: 'fpdavis3@gmail.com',
			status: 'Offline'
		},
		{
			name: 'David',
			email: 'dave@gmail.com',
			status: 'Online'
		}, {
			name: 'David Takasaki',
			email: 'TakaDavid@gmail.com',
			status: 'Online'
		}, {
			name: 'Joey Moore',
			email: 'JoeyM@gmail.com',
			status: 'Offline'
		}, {
			name: 'Nicole',
			email: 'NicoleD@gmail.com',
			status: 'Online'
		}, {
			name: 'Dev C',
			email: 'Dev@gmail.com',
			status: 'Offline'
		},
		{
			name: 'Joe',
			email: 'Jose44@gmail.com',
			status: 'Online'
		}, {
			name: 'Tim Tebow',
			email: 'Ttebow@gmail.com',
			status: 'Online'
		}, {
			name: 'Jack Black',
			email: 'JackyBoy@gmail.com',
			status: 'Offline'
		}, {
			name: 'Lauren Porter',
			email: 'Laladada@gmail.com',
			status: 'Online'
		}
	];


});