/* global url */
angular.module('messangerApp').controller('profileCtrl', function ($scope, chatroomService) {

	$scope.showSignuature = false;
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
	
	
	//getting users info
	$scope.findUser = function () {
		chatroomService.findUser().then(function (response) {
			// console.log(response);
			$scope.users = response;
		});
	}
	$scope.findUser();
	
	//Fake data
	
	$scope.usersInfo = chatroomService.usersInfo;

	$scope.friends = chatroomService.friends;


});