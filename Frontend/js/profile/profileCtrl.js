/* global url */
angular.module('messangerApp').controller('profileCtrl', function ($scope, $stateParams, chatroomService, Socket) {

	$scope.statusUpdate = function () {
		var statusUpdateObj = {
			Userstatus: true
		}
		chatroomService.updateUserInfo(statusUpdateObj, $stateParams.id).then(function (response) {
			$scope.findCurrentUser($stateParams.id);
		});
	}

	$scope.statusUpdate();

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
			$scope.friends.forEach(function (friend, i) {
				Socket.emit('friendStatus', friend.Userstatus);
			})
		for (var i = 0; i < $scope.friends.length; i++) {
			if ($scope.friends[i].Userstatus === true) {
				$scope.friends[i].Userstatus = "Online";
			} else {
				$scope.friends[i].Userstatus = "Offline";
			}
		}
		})
	}

	Socket.on('friendStatus', function (friendsStatus) {
		console.log('friendsStatus', friendsStatus);
		$scope.friendsStatus = friendsStatus;
		if($scope.friendsStatus === true){
			$scope.friendsStatus = "Online";
		} else {
			$scope.friendsStatus = "Offline";
		}
		$scope.$digest();
	})


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
		chatroomService.updateUserInfo(newUserObj, $stateParams.id).then(function (response) {
			console.log('response of updated user:', response);
			$scope.findCurrentUser($stateParams.id);
		});
		$scope.showPersonalInfo = true;
		$scope.editingPersonalInfo = false;
	}
	
	///////////////////////////////////////////////////
	//////////getting current Users info//////////////
	/////////////////////////////////////////////////
	
	$scope.findCurrentUser = function (UserId) {
		chatroomService.findCurrentUser(UserId).then(function (response) {
			// console.log(response);
			$scope.usersInfo = response;
		});
	}
	$scope.findCurrentUser($stateParams.id);


});//end