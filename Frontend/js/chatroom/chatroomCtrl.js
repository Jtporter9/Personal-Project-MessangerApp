angular.module('messangerApp').controller('chatroomCtrl', function ($scope, chatroomService) {
	// $scope.conversations = chatroomService.conversations;
	
	$scope.showProfileLink = true;
	$scope.showChatroomLink = false;

	$scope.style2 = 'message-right';

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
		}
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
});