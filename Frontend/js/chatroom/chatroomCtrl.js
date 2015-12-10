angular.module('messangerApp').controller('chatroomCtrl', function ($scope,
	$timeout, chatroomService, $stateParams, $location, $anchorScroll) {

	$scope.showSignuature = false;
	$scope.showProfileLink = true;
	$scope.showChatroomLink = false;
	$scope.chatroomTitle = true;
	$scope.profileTitle = false;

	$scope.showlittleInput = true;
	
	//////////////////////////////
	/////find current user///////
	////////////////////////////
	
	$scope.findCurrentUserById = function (UserId) {
		chatroomService.findCurrentUser(UserId).then(function (response) {
			$scope.usersInfo = response;

			$scope.usersInfo.conversations.forEach(function (conversation, convIndex) {
				conversation.people.map(function (personId, peopleIndex) {
					chatroomService.findCurrentUser(personId).then(function (response) {
						$scope.usersInfo.conversations[convIndex].people[peopleIndex] = response;
					});
				});
			});

		});
	};

	$scope.findCurrentUserById($stateParams.id);
	///////////
	//Emojis//
	/////////
	// function convert() {
	// 	var input = document.getElementById('inputText').value;
	// 	var output = emojione.shortnameToImage(input);
	// 	document.getElementById('outputText').innerHTML = output;
	// }

	//////////////////
	//getting convos//
	//////////////////
	
	$scope.findConvos = function () {
		chatroomService.findConvos().then(function (response) {
			// $scope.conversations = response;
			// $scope.conversations.people = response.people;
		});
	}

	var showAlertBoxOnConvo = function () {
		$scope.showEnteredConversationAlert = true;
		$timeout(function () {
			$scope.showEnteredConversationAlert = false;
		}, 4000)
	}

	$scope.findCurrentConvo = function (ConvoId, convos) {
		chatroomService.findCurrentConvo(ConvoId).then(function (response) {
			$scope.messagesInConvos = response.messages;
			$scope.currentConvo = convos;
			$scope.ConvoId = response._id;
			showAlertBoxOnConvo();
		})
	}
	$scope.findCurrentConvoForMessage = function (ConvoId, convos) {
		chatroomService.findCurrentConvo(ConvoId).then(function (response) {
			$scope.messagesInConvos = response.messages;
			$scope.currentConvo = convos;
			$scope.ConvoId = response._id;
		})
	}

	$scope.findConvos();
	
	//////////////////////////////////////
	//////////adding conversation/////////
	//////////////////////////////////////
	$scope.friendsToAddToConvo = [];

	$scope.addingFriendsToConvo = function (friendObj, index) {
		$scope.friendsToAddToConvo.push(friendObj);
	}
	$scope.deletingFriendsFromConvo = function (index) {
		$scope.friendsToAddToConvo.splice(index, 1);
	};

	$scope.addConversation = function () {
		$scope.addingConversation = true;
	};

	//////////////////////////////////////////
	//////Add new Conversation////////////////
	/////////////////////////////////////////

	$scope.submitNewConvo = function (friendsToAddToConvo) {
		
		////addConvo to Conversation collection///////
		$scope.addingConversation = false;
		var UserIds = [];
		for (var i = 0; i < friendsToAddToConvo.length; i++) {
			UserIds.push(friendsToAddToConvo[i]._id);
		}
		var newConvo = {
			people: UserIds,
		}
		$scope.scrollFriendsFinder = "";
		chatroomService.addConvo(newConvo).then(function (response) {
			// $scope.findConvos();
			/// addConvos to Users collection array of Convos//////
			var newUserObj = {
				conversations: response.data._id
			}
			chatroomService.updateUser(newUserObj, $stateParams.id).then(function (response) {
				// console.log("response from update:", response);
				$scope.findCurrentUserById($stateParams.id);
			});
		});
		$scope.friendsToAddToConvo = [];
		$scope.newConvo = {};
	};

	$scope.cancelForm = function () {
		$scope.addingConversation = false;
		$scope.scrollFriendsFinder = "";
		$scope.friendsToAddToConvo = [];
	}
	/////////////////////////////
	// deleting convos!!@$#@!#$//
	/////////////////////////////
	
	$scope.deleteConvo = function (ConvoId) {
		chatroomService.deleteConvo(ConvoId).then(function (response) {
			// $scope.findConvos();
			$scope.findCurrentUserById($stateParams.id);
		})
	}
	//////////////////////////////////////
	///////sending a new messages////////
	////////////////////////////////////
	$scope.sendNewMessage = function (newMessageText) {
		$scope.showFileUpload = false;
		var newMessage = {
			fromName: 'You',
			content: newMessageText
		}
		chatroomService.updateMessage(newMessage, $scope.ConvoId).then(function (response) {
			$scope.findCurrentConvoForMessage($scope.ConvoId);
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
	////////////////////////////////////
	/////////////find Users////////////
	//////////////////////////////////

	$scope.findFriends = function (UserId) {
		chatroomService.findUser().then(function (response) {
			// console.log(response);
			$scope.friends = response;
			for (var i = 0; i < $scope.friends.length; i++) {
				if ($scope.friends[i].status === false || !$scope.friends[i].status) {
					$scope.friends[i].status = "Offline";
				} else {
					$scope.friends[i].status = "Online";
				}
			}
		})
	}
	$scope.findFriends();
});