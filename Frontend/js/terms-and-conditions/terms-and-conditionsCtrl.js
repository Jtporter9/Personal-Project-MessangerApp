angular.module('messangerApp')
.controller('terms-and-conditionsCtrl', function ($scope, chatroomService) {

	$scope.showSignuature = false;
	$scope.showProfileLink = true;
	$scope.showChatroomLink = true;
	$scope.chatroomTitle = false;
	$scope.profileTitle = false;
	$scope.showLoginLink = true;
});