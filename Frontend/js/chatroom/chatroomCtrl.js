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
			console.log(response);
			// $scope.conversations.unshift(newConvo);
			$scope.findConvos();
		});
		$scope.friendsToAddToConvo = [];
		$scope.newConvo = {};
	};


	$scope.cancelForm = function () {
		$scope.addingConversation = false;
		$scope.scrollFriendsFinder = "";
	}
	
	
	//sending new message area
	$scope.sendNewMessage = function (i) {
		$scope.showlittleInput = true;
		$scope.showLargeInput = false;
		$scope.newMessageText = "";
		$scope.showFileUpload = false;
		var newMessage = {
			from: 'You',
			content: i,
			time: new Date
		}
		$scope.messages.push(newMessage);
		$timeout(function () {
			$('#message-container').scrollTop($('#message-container')[0].scrollHeight);
		}, 100)
		
		
		// var chatBox = document.getElementById('#message-container');
		// chatBox.scrollTop = 300 + 8 + ($scope.messages.length * 240);
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
	$scope.messages = chatroomService.messages;
	$scope.friends = chatroomService.friends;



});