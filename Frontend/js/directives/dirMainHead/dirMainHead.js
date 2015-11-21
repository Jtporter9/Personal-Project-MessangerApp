angular.module('messangerApp')

.directive('dirMainHead', function () {
		return {
			templateUrl: 'js/directives/dirMainHead/dirMainHead.html',
			controller: function($scope){
				
				$scope.navToggle = function(){
					$scope.showNav = !$scope.showNav;
				}
				
			}
		}
})