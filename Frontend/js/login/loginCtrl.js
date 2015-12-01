angular.module('messangerApp').controller('loginCtrl', function ($scope) {

	// angular

	$scope.showSignuature = true;

	$scope.showLoginForm = function () {
		if ($scope.showRegister === true) {
			$scope.showRegister = !$scope.showRegister;
			$scope.showLogin = !$scope.showLogin;

		} else {
			$scope.showLogin = !$scope.showLogin;
		}
	}

	$scope.showRegisterForm = function () {
		if ($scope.showLogin === true) {
			$scope.showLogin = !$scope.showLogin;
			$scope.showRegister = !$scope.showRegister;
		} else {
			$scope.showRegister = !$scope.showRegister;
		}
	}
	$scope.cancelForm = function () {
		$scope.showLogin = false;
		$scope.showRegister = false;
	}

});