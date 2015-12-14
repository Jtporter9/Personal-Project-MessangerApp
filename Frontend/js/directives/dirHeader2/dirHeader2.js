angular.module('messangerApp')


	.directive('dirHeader2', function () {
		return {
			templateUrl: 'js/directives/dirHeader2/dirHeader2.html',
			controller: function ($scope, $state, $stateParams, chatroomService, $window) {

				// $scope.user = {
				// 	username: $window.username
				// }
				
				$scope.getCurrentUserInfo = function (UserId) {
					chatroomService.findCurrentUser(UserId).then(function (response) {
						// console.log(response);
						$scope.usersInfo = response;
					})
				};
				$scope.getCurrentUserInfo($stateParams.id);

				$scope.currentUserId = $stateParams.id;

				$scope.becomeOffline = function () {
					$scope.usersInfo.Userstatus = false;
					// var statusUpdateObj = {
					// 	Userstatus: false
					// }
					chatroomService.updateUserInfo($scope.usersInfo, $stateParams.id).then(function (response) {
						$scope.getCurrentUserInfo($stateParams.id);
						// console.log('after logging out',$scope.usersInfo, response);
					})
				};


			}
		}
	});