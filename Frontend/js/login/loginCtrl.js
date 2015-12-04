angular.module('messangerApp').controller('loginCtrl', function ($scope, chatroomService, $window) {

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
	

	//making a new user/registering

	$scope.submitNewUser = function () {
		chatroomService.addUser($scope.user).then(function (response) {
			$window.username = response.data.username;
		});
		$scope.user = {};
	};
		
	// consoleText(['Welcome to Goojle Hangouts', 'We are like Google Hangouts, but better!', 'Horrrray!'], 'text', ['#88051E', 'white', '#005ACA']);

	// function consoleText(words, id, colors) {
	// 	if (colors === undefined) colors = ['#fff'];
	// 	var visible = true;
	// 	var con = document.getElementById('console');
	// 	var letterCount = 1;
	// 	var x = 1;
	// 	var waiting = false;
	// 	var target = document.getElementById(id)
	// 	target.setAttribute('style', 'color:' + colors[0])
	// 	window.setInterval(function () {

	// 		if (letterCount === 0 && waiting === false) {
	// 			waiting = true;
	// 			target.innerHTML = words[0].substring(0, letterCount)
	// 			window.setTimeout(function () {
	// 				var usedColor = colors.shift();
	// 				colors.push(usedColor);
	// 				var usedWord = words.shift();
	// 				words.push(usedWord);
	// 				x = 1;
	// 				target.setAttribute('style', 'color:' + colors[0])
	// 				letterCount += x;
	// 				waiting = false;
	// 			}, 1000)
	// 		} else if (letterCount === words[0].length + 1 && waiting === false) {
	// 			waiting = true;
	// 			window.setTimeout(function () {
	// 				x = -1;
	// 				letterCount += x;
	// 				waiting = false;
	// 			}, 1000)
	// 		} else if (waiting === false) {
	// 			target.innerHTML = words[0].substring(0, letterCount)
	// 			letterCount += x;
	// 		}
	// 	}, 120)
	// 	window.setInterval(function () {
	// 		if (visible === true) {
	// 			con.className = 'console-underscore hidden'
	// 			visible = false;

	// 		} else {
	// 			con.className = 'console-underscore'

	// 			visible = true;
	// 		}
	// 	}, 400)
	// }

});