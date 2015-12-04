angular.module('messangerApp')


	.directive('dirHeader2', function () {
		return {
			templateUrl: 'js/Directives/dirHeader2/dirHeader2.html',
			controller: function ($scope, chatroomService, $window) {

				$scope.user = {
					username: $window.username
				}

				// console.log("username/windowthingy", $window.username);
				// 		chatroomService.findCurrentUser(user._id).then(function (response) {
				// 			// console.log(response);
				// 			$scope.getProducts();
				// 			// $scope.products.splice($scope.products.indexOf(productId), 1);
				// 		})

				// $scope.currentUser = $scope.getCurrentUser($scope.user._id);
			}
		}
	});