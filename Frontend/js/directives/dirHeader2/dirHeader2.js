angular.module('messangerApp')


	.directive('dirHeader2', function () {
		return {
			templateUrl: 'js/directives/dirHeader2/dirHeader2.html',
			controller: function ($scope, $state, $stateParams, chatroomService, $window) {


				$scope.getCurrentUserInfo = function (UserId) {
					chatroomService.findCurrentUser(UserId).then(function (response) {
						$scope.usersInfo = response;
						$scope.currentUserId = response._id;
					})
				};
				$scope.getCurrentUserInfo($stateParams.id);

				$scope.becomeOffline = function () {
					$scope.usersInfo.Userstatus = false;
					chatroomService.updateUserInfo($scope.usersInfo, $stateParams.id).then(function (response) {
						$scope.getCurrentUserInfo($stateParams.id);
					});
				};
			}
		}
	});