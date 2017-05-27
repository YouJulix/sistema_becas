angular.
	module('phonecatApp').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider){
				$locationProvider.hashPrefix('!'); // We also used $locationProvider.hashPrefix() to set the hash-prefix to !. This prefix will appear in the links to our client-side routes, right after the hash (#) symbol and before the actual path (e.g. index.html#!/some/path).
				//Setting a prefix is not necessary, but it is considered a good practice (for reasons that are outside the scope of this tutorial). ! is the most commonly used prefix.
				//Al agregar este prefijo, en nuestros enlaces debemos colocar dicho prefijo: ejemplo: 

				$routeProvider.
					when('/phones', {
						template: '<phone-list></phone-list>'
					}).
					when('/phones/:phoneId', {
						template: '<phone-detail></phone-detail>'
					}).
					otherwise('/phones');
			}
		]);