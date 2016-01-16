'use strict';

//socket factory that provides the socket service

angular.module('messangerApp')
	.service('Socket', ['$rootScope', function ($rootScope) {

		var socket = io.connect();
		return socket;
	}

	]);
