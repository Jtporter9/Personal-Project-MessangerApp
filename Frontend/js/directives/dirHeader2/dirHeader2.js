angular.module('messangerApp')


	.directive('dirHeader2', function () {
		return {
			templateUrl: 'js/Directives/dirHeader2/dirHeader2.html',
			controller: function ($scope, chatroomService, $window) {

				$scope.user = {
					username: $window.username
				}
				// console.log($scope.user);
			}
		}
	});