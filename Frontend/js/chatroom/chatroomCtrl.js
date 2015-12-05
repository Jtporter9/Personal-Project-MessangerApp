angular.module('messangerApp').controller('chatroomCtrl', function ($scope,
	$timeout, chatroomService, $location, $anchorScroll) {

	$scope.showSignuature = false;
	$scope.showProfileLink = true;
	$scope.showChatroomLink = false;
	$scope.chatroomTitle = true;
	$scope.profileTitle = false;

	$scope.showlittleInput = true;
	
	//getting convos
	
	$scope.findConvos = function () {
		chatroomService.findConvos().then(function (response) {
			// console.log('findingCovos',response);
			$scope.conversations = response;
		});
	}
	$scope.findConvos();
	
	//adding conversation
	$scope.friendsToAddToConvo = [];

	$scope.addingFriendsToConvo = function (i) {
		$scope.friendsToAddToConvo.push(i);
	}
	$scope.deletingFriendsFromConvo = function (i) {
		$scope.friendsToAddToConvo.splice(i, 1);
	};

	$scope.addConversation = function () {
		$scope.addingConversation = true;
	};

	$scope.submitNewConvo = function (i) {
		$scope.addingConversation = false;
		var newConvo = {
			people: $scope.friendsToAddToConvo,
		}
		$scope.scrollFriendsFinder = "";
		chatroomService.addConvo(newConvo).then(function (response) {
			// console.log(response);
			// $scope.conversations.unshift(newConvo);
			$scope.findConvos();
		});
		$scope.friendsToAddToConvo = [];
		$scope.newConvo = {};
	};


	$scope.cancelForm = function () {
		$scope.addingConversation = false;
		$scope.scrollFriendsFinder = "";
		$scope.friendsToAddToConvo = [];
	}
	// deleting convos!!@$#@!#$
	
	$scope.deleteConvo = function (ConvoId) {
		chatroomService.deleteConvo(ConvoId).then(function (response) {
			// console.log(response);
			$scope.findConvos();
			// $scope.products.splice($scope.products.indexOf(productId), 1);
		})
	}
	
	// getting new messages /////////
	
		$scope.findMessage = function () {
		chatroomService.findMessage().then(function (response) {
			// console.log('findingMessages',response);
			$scope.messages = response;
		});
	}
	$scope.findMessage();
	
	//sending new message area
	$scope.sendNewMessage = function (i) {
		$scope.showFileUpload = false;
		var newMessage = {
			fromName: 'You',
			content: i
		}
		chatroomService.addMessage(newMessage).then(function (response) {
			console.log(response);
			$scope.findMessage();
		// $scope.messages.push(newMessage);
		});
		$scope.newMessageText = "";
		$timeout(function () {
			$('#message-container').scrollTop($('#message-container')[0].scrollHeight);
		}, 100)
	}




	$scope.attachFile = function () {
		$scope.showFileUpload = !$scope.showFileUpload;
	}
	$scope.searchKeyPress = function (e, i) {
		e = e || window.event;
		if (e.keyCode == 13) {
			$scope.sendNewMessage(i);
			return false;
		}
		return true;
	}

	$scope.usersInfo = chatroomService.usersInfo;
	$scope.friends = chatroomService.friends;



});