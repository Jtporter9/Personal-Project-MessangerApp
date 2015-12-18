angular.module('messangerApp').controller('chatroomCtrl', function ($scope,
	$timeout, chatroomService, $stateParams, $location, $anchorScroll, Socket) {

	$scope.disableSendBtn = true;
	$scope.showSignuature = false;
	$scope.showProfileLink = true;
	$scope.showChatroomLink = false;
	$scope.chatroomTitle = true;
	$scope.profileTitle = false;

	$scope.showlittleInput = true;

	$scope.cancelForm = function () {
		$scope.addingConversation = false;
		$scope.scrollFriendsFinder = "";
		$scope.friendsToAddToConvo = [];
	}
	
	//////////////////////////////
	/////find current user///////
	////////////////////////////

	$scope.findCurrentUserById = function (UserId) {
		chatroomService.findCurrentUser(UserId).then(function (response) {
			$scope.usersInfo = response;
			// console.log($scope.usersInfo);
			Socket.emit('CurrentUsersConvos', response.conversations);
			// console.log(response.conversations);
			$scope.usersInfo.conversations.forEach(function (conversation, convoIndex) {
				conversation.people.map(function (personId, peopleIndex) {
					chatroomService.findCurrentUser(personId).then(function (response) {
						$scope.usersInfo.conversations[convoIndex].people[peopleIndex] = response;
					});
				});
			});

		});
	};

	// Socket.on('CurrentUsersConvosFromSockets', function (ConvosFromSockets) {
	// 	$scope.usersInfo.conversations = ConvosFromSockets;
	// 	$scope.usersInfo.conversations.forEach(function (conversation, convoIndex) {
	// 		conversation.people.map(function (personId, peopleIndex) {
	// 			chatroomService.findCurrentUser(personId).then(function (response) {
	// 				$scope.usersInfo.conversations[convoIndex].people[peopleIndex] = response;
	// 			});
	// 		});
	// 	});
	// 	$scope.$digest();
	// });//end of socket

	$scope.getCurrentUsersId = function () {
		chatroomService.currentUsersId().then(function (response) {
			if (response._id === $stateParams.id) {
				$scope.currentUserId = response._id;
				$scope.findCurrentUserById($scope.currentUserId);
			}
		})
	}
	$scope.getCurrentUsersId();

	window.setInterval(function () {
		$scope.findCurrentUserById($scope.currentUserId)
	}, 400000);

	/////////////////////////////////////////
	///////////getting convos///////////////
	///////////////////////////////////////
	
	$scope.findConvos = function () {
		chatroomService.findConvos().then(function (response) {
		});
	}

	var showNewMessagesBox = function () {
		if ($scope.messagesFromSockets._id !== $stateParams) {
			$scope.showNewMessagesBox = false;
		} else {
			$scope.showNewMessagesBox = true;
			$timeout(function () {
				$scope.showEnteredConversationAlert = false;
			}, 4000)
		}
	}

	var showAlertBoxOnConvo = function () {
		$scope.showEnteredConversationAlert = true;
		$timeout(function () {
			$scope.showEnteredConversationAlert = false;
		}, 5000)
	}

	$scope.findCurrentConvoForMessage = function (ConvoId, convos) {
		chatroomService.findCurrentConvo(ConvoId).then(function (response) {
			$scope.messagesInConvos = response.messages;
			Socket.emit('message', response.messages);
			$scope.currentConvo = convos;
			$scope.ConvoId = response._id;
			Socket.on('messageFromSockets', function (messagesFromSockets) {
				$scope.messagesFromSockets = messagesFromSockets;
				$scope.$digest();
				showNewMessagesBox();
				$timeout(function () {
					$('#message-container').scrollTop($('#message-container')[0].scrollHeight);
				}, 100)
			})

		})
	}

	$scope.findCurrentConvo = function (ConvoId, convos) {
		chatroomService.findCurrentConvo(ConvoId).then(function (response) {
			$scope.messagesFromSockets = response.messages;
			$scope.currentConvo = convos;
			$scope.ConvoId = response._id;
			$scope.numNewMessages = response.numNewMessages;
			showAlertBoxOnConvo();
			$scope.showMessages = true;
			$scope.disableSendBtn = false;
			var newConvoObj = {
				numNewMessages: $scope.numNewMessages = 0
			}
			chatroomService.updateConvo(newConvoObj, $scope.ConvoId).then(function (response) {
				$scope.findCurrentUserById($scope.currentUserId);
			})
			$timeout(function () {
				$('#message-container').scrollTop($('#message-container')[0].scrollHeight);
			}, 100)
		})
	}

	$scope.findConvos();
	
	///////////////////////////////////////////
	//////////////adding conversation/////////
	/////////////////////////////////////////
	$scope.friendsToAddToConvo = [];

	$scope.addingFriendsToConvo = function (friendObj, index) {
		// $scope.friendsToAddToConvo.push($scope.usersInfo);
		$scope.friendsToAddToConvo.push(friendObj);
	}
	$scope.deletingFriendsFromConvo = function (index) {
		$scope.friendsToAddToConvo.splice(index, 1);
	};

	$scope.addConversation = function () {
		$scope.addingConversation = true;
	};

	///////////////////////////////////////////
	//////////////Add new Conversation////////
	/////////////////////////////////////////

	
	//ng-if="showUsersNameInConvo(usersInfo._id, convos.people)"
	// $scope.showUsersNameInConvo = function (currentUserId, peopleInConvos) {
	// 	// console.log(peopleInConvos);
	// 	peopleInConvos.forEach(function (person, i) {
	// 		console.log(person);
	// 	if (currentUserId === person) {
	// 		return true;
	// 	} else { return false };
	// 	})
	// }

	$scope.UserIds = [];
	for (var i = 0; i < $scope.friendsToAddToConvo.length; i++) {
		$scope.UserIds.push($scope.friendsToAddToConvo[i]._id);
	}
	$scope.addConversastionIdToUsers = function () {
		$scope.UserIds.forEach(function (userId, index) {
			$scope.submitNewConvo(userId);
		})

	}

	$scope.submitNewConvo = function (userObjs) {
		console.log(userObjs);
		////addConvo to Conversation collection///////
		$scope.addingConversation = false;
		var newConvo = {
			people: userObjs,
		}
		$scope.scrollFriendsFinder = "";
		chatroomService.addConvo(newConvo).then(function (response) {
			/// addConvos to Users collection array of Convos//////
			var conversationId = {
				conversations: response.data._id
			}
			userObjs.forEach(function (userId, index) {
				chatroomService.updateUser(conversationId, userId._id).then(function (response) {
					$scope.findCurrentUserById($stateParams.id);
				});
			})
		});
		$scope.friendsToAddToConvo.push($scope.usersInfo);
		$scope.friendsToAddToConvo = [];
		$scope.newConvo = {};
	};
	
	//////////////////////////////////////////////
	////////// deleting convos!!@$#@!#$//////////
	////////////////////////////////////////////
	
	$scope.deleteConvo = function (ConvoId) {
		chatroomService.deleteConvo(ConvoId).then(function (response) {
			$scope.findCurrentUserById($stateParams.id);
		})
	}
	//////////////////////////////////////////
	///////////sending a new messages////////
	////////////////////////////////////////
	$scope.sendNewMessage = function (newMessageText) {
		$scope.showEnteredConversationAlert = false;
		$scope.showFileUpload = false;
		var newMessage = {
			fromName: $scope.usersInfo.name,
			content: newMessageText,
			time: new Date()
			//moment().add('days').calendar()
		}
		chatroomService.updateMessage(newMessage, $scope.ConvoId).then(function (response) {
			$scope.findCurrentConvoForMessage($scope.ConvoId);
		});

		var newConvoObj = {
			numNewMessages: $scope.numNewMessages += 1
		}
		chatroomService.updateConvo(newConvoObj, $scope.ConvoId).then(function (response) {
			// $scope.findCurrentUserById($scope.currentUserId);
			// $scope.findConvos();
		})
		$scope.newMessageText = "";
		$timeout(function () {
			$('#message-container').scrollTop($('#message-container')[0].scrollHeight);
		}, 100)
	}

	$scope.searchKeyPress = function (e, i) {
		// if(){}
		e = e || window.event;
		if (e.keyCode == 13) {
			$scope.sendNewMessage(i);
			return false;
		}
		return true;
	}

	$scope.attachFile = function () {
		$scope.showFileUpload = !$scope.showFileUpload;
	}
	////////////////////////////////////
	/////////////find Users////////////
	//////////////////////////////////

	$scope.findFriends = function (UserId) {
		chatroomService.findUser().then(function (response) {
			$scope.friends = response;
			// console.log(response)
			for (var i = 0; i < $scope.friends.length; i++) {
				if ($scope.friends[i].Userstatus === false || !$scope.friends[i].Userstatus) {
					$scope.friends[i].Userstatus = "Offline";
				} else {
					$scope.friends[i].Userstatus = "Online";
				}
				// console.log(response[i].Userstatus);
				Socket.emit('friendstatus', response[i].Userstatus);

			}
		})
	}

	Socket.on('messageFromSockets', function (friendsStatus) {
		// console.log(friendsStatus);
		$scope.friends.Userstatus = friendsStatus;
		$scope.$digest();
	})



	$scope.findFriends();
});