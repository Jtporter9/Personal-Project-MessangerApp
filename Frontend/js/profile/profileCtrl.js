/* global url */
angular.module('messangerApp').controller('profileCtrl', function ($scope, $stateParams, chatroomService) {

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
	// $scope.submitNewEdit = function () {
	// 	$scope.showPersonalInfo = true;
	// 	$scope.editingPersonalInfo = false;
	// }
	
	/////////Getting Friends////////////////
	
	$scope.findFriends = function () {
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
	
	//update current Users info 
	$scope.updateUserInfo = function (newUserObj) {
		$scope.showFileUpload = false;
		// console.log("this should be the new user Obj:",newUserObj);
		chatroomService.updateUser(newUserObj, $stateParams.id).then(function (response) {
			// console.log(response);
			$scope.findCurrentUser($stateParams.id);
		});
		$scope.showPersonalInfo = true;
		$scope.editingPersonalInfo = false;
	}
	
	
	//getting current Users info
	
	$scope.findCurrentUser = function (UserId) {
		chatroomService.findCurrentUser(UserId).then(function (response) {
			// console.log(response);
			$scope.usersInfo = response;
		});
	}
	$scope.findCurrentUser($stateParams.id);


});//end