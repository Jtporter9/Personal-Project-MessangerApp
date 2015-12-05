angular.module('messangerApp', ['ui.router'])

	.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'js/login/login.html',
				controller: 'loginCtrl'
			})

			.state('chatroom', {
				url: '/chatroom',
				templateUrl: 'js/chatroom/chatroom.html',
				controller: 'chatroomCtrl'
			})

			.state('profile', {
				url: '/profile',
				templateUrl: 'js/profile/profile.html',
				controller: 'profileCtrl'
			})
				.state('terms-and-conditions', {
				url: '/terms-and-conditions',
				templateUrl: 'js/terms-and-conditions/terms-and-conditions.html',
				controller: 'terms-and-conditionsCtrl'
			})

	});