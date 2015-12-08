angular.module('messangerApp')


	.directive('dirHeader2', function () {
		return {
			templateUrl: 'js/Directives/dirHeader2/dirHeader2.html',
			controller: function ($scope, $state, $stateParams, chatroomService, $window) {

				// $scope.user = {
				// 	username: $window.username
				// }
				
				$scope.getCurrentUserInfo = function (UserId) {
					chatroomService.findCurrentUser(UserId).then(function (response) {
						console.log(response);
						$scope.usersInfo = response;
					})
				};
				$scope.getCurrentUserInfo($stateParams.id);

				$scope.currentUserId = $stateParams.id;
			}
		}
	});