angular.module('messangerApp')


	.directive('dirMessageBox', function () {
		return {
			templateUrl: 'js/Directives/dirSocialMedia/dirMessageBox.html',
			scope: {
				dirMessageBox: "="
			},
			link: function (scope, element) {
				scope.$watchCollection('dirMessageBox', function (newValue) {
					if (newValue) {
						$(element).scrollTop($(element)[0].scrollHeight);
					}
				});
			}
		}
	})

	.controller('dirMessageBox', function ($scope) {

		$scope.messages = [];
		$scope.im = {};

		$scope.sendIM = function (msg) {


			$scope.messages.push(msg);
			$scope.im = {};
    
			//$('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
			/*
				var chatBox = document.getElementById('chatBox');
				chatBox.scrollTop = 300 + 8 + ($scope.messages.length * 240);
				*/
		}

	})