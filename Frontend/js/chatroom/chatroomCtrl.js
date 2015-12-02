angular.module('messangerApp').controller('chatroomCtrl', function ($scope, chatroomService, $location, $anchorScroll) {
	/////scrolly stuff///////
	
	// $scope.im = {};

	// $scope.sendIM = function (msg) {

	// 	$scope.messages.push(msg);
	// 	$scope.im = {};

	// 	$('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);

	// 	var chatBox = document.getElementById('chatBox');
	// 	chatBox.scrollTop = 300 + 8 + ($scope.messages.length * 240);
	// }
	
	/////////////////REAL STUFF//////////////////////

	$scope.showSignuature = false;
	$scope.showProfileLink = true;
	$scope.showChatroomLink = false;
	$scope.chatroomTitle = true;
	$scope.profileTitle = false;

	$scope.showlittleInput = true;
	
	//adding conversation
	$scope.addConversation = function () {
		$scope.addingConversation = true;
	};

	$scope.submitNewConvo = function () {
		$scope.addingConversation = false;
		$scope.scrollFriendsFinder = "";
	}

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
		$('#message-container').scrollTop($('#message-container')[0].scrollHeight + 200);
		
		
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




	$scope.messages = [
		{
			from: 'Freddie Davis',
			content: 'Dude, Tanner are you coming tonight?',
			time: new Date
		},
		{
			from: 'Zac',
			content: 'I am, yeah',
			time: new Date
		},
		{
			from: 'You',
			content: 'Yeah I can be there',
			time: new Date,
			id: 1
		},
		{
			from: 'Zac',
			content: 'Actually my wife wont let me',
			time: new Date
		},
		{
			from: 'Taylor Rowley',
			content: 'I can\'t',
			time: new Date
		},
		{
			from: 'You',
			content: 'Dude what!?',
			time: new Date,
			id: 1
		},
		{
			from: 'You',
			content: 'It\'s okay I\'m just kidding',
			time: new Date,
			id: 1
		},
		{
			from: 'Taylor Rowley',
			content: 'Haha okay.',
			time: new Date
		},
	];

	$scope.conversations = [
		{
			from: ['Freddie Davis', 'Zac Christianson', 'Taylor Rowley'],
			date: new Date,
			messageCount: 33,
		},
		{
			from: ['Tobee Gunter'],
			date: new Date,
			messageCount: 54
		}, {
			from: ['Mom', 'Daddy'],
			date: new Date,
			messageCount: 21
		}, {
			from: ['Coach Burbidge'],
			date: new Date,
			messageCount: 11
		}, {
			from: ['Rey'],
			date: new Date,
			messageCount: 82
		}, {
			from: ['Zac'],
			date: new Date,
			messageCount: 12
		}, {
			from: ['Luke Skywalker'],
			date: new Date,
			messageCount: 81
		},

	];
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
	];
});