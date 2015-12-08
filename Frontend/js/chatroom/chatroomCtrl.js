angular.module('messangerApp').controller('chatroomCtrl', function ($scope,
	$timeout, chatroomService, $location, $anchorScroll) {

	$scope.showSignuature = false;
	$scope.showProfileLink = true;
	$scope.showChatroomLink = false;
	$scope.chatroomTitle = true;
	$scope.profileTitle = false;

	$scope.showlittleInput = true;
	
	//Emojis
	
	// function convert() {
	// 	var input = document.getElementById('inputText').value;
	// 	var output = emojione.shortnameToImage(input);
	// 	document.getElementById('outputText').innerHTML = output;
	// }

	//getting convos
	
	$scope.findConvos = function () {
		chatroomService.findConvos().then(function (response) {
			// console.log(response[0].people);
			$scope.conversations = response;
		});
	}
	$scope.findCurrentConvo = function (ConvoId) {
		chatroomService.findCurrentConvo(ConvoId).then(function (response) {
			// console.log(response.messages);
			$scope.messagesInConvos = response.messages;
		})
	}

	$scope.findConvos();
	
	//////////adding conversation/////////
	
	$scope.friendsToAddToConvo = [];

	$scope.addingFriendsToConvo = function (friendObj) {
		$scope.friendsToAddToConvo.push(friendObj);
	}
	$scope.deletingFriendsFromConvo = function (index) {
		$scope.friendsToAddToConvo.splice(index, 1);
	};

	$scope.addConversation = function () {
		$scope.addingConversation = true;
	};

	$scope.submitNewConvo = function (friendsToAddToConvo) {
		console.log('friendsToAddToConvo', friendsToAddToConvo );
		$scope.addingConversation = false;
		var UserIds = [];
		for (var i = 0; i < friendsToAddToConvo.length; i++) {
			UserIds.push(friendsToAddToConvo[i]._id);
		}
		var newConvo = {
			people: UserIds,
		}
		console.log(newConvo);
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
	
	// $scope.findMessage = function () {
	// 	chatroomService.findMessage().then(function (response) {
	// 		// console.log('findingMessages',response);
	// 		$scope.messages = response;
	// 	});
	// }
	// $scope.findMessage();
	
	//sending new message area
	$scope.sendNewMessage = function (i) {
		$scope.showFileUpload = false;
		var newMessage = {
			fromName: 'You',
			content: i
		}
		chatroomService.addMessage(newMessage).then(function (response) {
			console.log(response);
			$scope.findCurrentConvo();
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
	//find friends to add to convos////

	$scope.findFriends = function (UserId) {
		chatroomService.findUser().then(function (response) {
			// console.log(response);
			$scope.friends = response;
			for (var i = 0; i < $scope.friends.length; i++) {
				if ($scope.friends[i].status === false) {
					$scope.friends[i].status = "Offline";
				} else {
					$scope.friends[i].status = "Online";
				}
			}
		})
	}
	$scope.findFriends();



});