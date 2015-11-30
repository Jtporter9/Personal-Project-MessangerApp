angular.module('messangerApp').controller('profileCtrl', function ($scope) {

	$scope.showPersonalInfo = true;
	$scope.showProfileLink = false;
	$scope.showChatroomLink = true;
	$scope.chatroomTitle = false;
	$scope.profileTitle = true;

	$scope.showEditProfile = function () {
		$scope.showEditBtn = true;
	}

	$scope.leaveEditProfile = function () {
		$scope.showEditBtn = false;
	}
	$scope.editYourPersonalInfo = function () {
		$scope.showPersonalInfo = false;
		$scope.editingPersonalInfo = true;
	}
	$scope.submitNewEdit = function () {
		$scope.showPersonalInfo = true;
		$scope.editingPersonalInfo = false;
	}

	/////////Adding new friends//////////////
	$scope.addingNewFriends = function () {
		$scope.addNewFriend = true;
	}

	$scope.submitNewFriend = function () {
		$scope.addNewFriend = false;
	}

	$scope.cancelForm = function () {
		$scope.addNewFriend = false;
	}
	
	//Fake data
	
	$scope.usersInfo = {
		name: 'J. Tanner Porter',
		about: "Blah Blah blah blah blah. Blah Blah blah blah blah,Blah Blah blah blah blah.",
		username: 'Jtporter9',
		userEmail: 'jtporter9@gmail.com',
		userPassword: 'password123'
	}

	$scope.friends = [
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
	]
});