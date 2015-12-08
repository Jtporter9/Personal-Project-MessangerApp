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
	
	/////////Getting Friends////////////////
	
	$scope.findFriends = function (UserId) {
		chatroomService.findUser().then(function (response) {
			// console.log(response);
			$scope.friends = response;
			for (var i = 0; i < $scope.friends.length; i++) {
				if ($scope.friends[i].status === true) {
					$scope.friends[i].status = "Online";
				} else {
					$scope.friends[i].status = "Offline";
				}
			}
		})
	}
	$scope.findFriends();
	

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
	
	$scope.findCurrentUser = function (Id) {
		chatroomService.findCurrentUser(Id).then(function (response) {
			console.log(response);
			$scope.usersInfo = response;
		});
	}
	$scope.findCurrentUser();
	
	//Fake data
	
	$scope.usersInfo = chatroomService.usersInfo;

	// $scope.friends = chatroomService.friends;


});