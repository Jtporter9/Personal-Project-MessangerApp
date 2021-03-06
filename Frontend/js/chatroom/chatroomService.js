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

	this.updateUser = function (newUserObj, id) {
		return $http.put('/api/users/' + id, newUserObj)
    }

	this.updateUserInfo = function (newUserObj, id) {
		return $http.put('/api/usersInfo/' + id, newUserObj)
    }

	this.currentUsersId = function () {
		return $http.get('/auth/currentuser').then(function (response) {
			return response.data;
		})
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
	this.updateConvo = function (newConvoObj, id) {
		return $http.put('/api/numnewmessages/' + id, newConvoObj).then(function(response){
			return response;
		})
    }

	this.deleteConvo = function (id) {
		return $http.delete('/api/conversations/' + id).then(function (response) {
			return response;
		})
    }
	
	///////////Message Calls////////////
	
	this.updateMessage = function (message, convo) {
		return $http.put('/api/conversations/' + convo, message)
    }
	this.findMessage = function () {
		return $http.get('/api/messages').then(function (response) {
			return response.data;

		});
    }
});