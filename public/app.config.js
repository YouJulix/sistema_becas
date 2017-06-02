angular.
	module('sistBecasApp').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider){
				$locationProvider.hashPrefix('!');// We also used $locationProvider.hashPrefix() to set the hash-prefix to !. This prefix will appear in the links to our client-side routes, right after the hash (#) symbol and before the actual path (e.g. index.html#!/some/path).
				//Setting a prefix is not necessary, but it is considered a good practice (for reasons that are outside the scope of this tutorial). ! is the most commonly used prefix.
				//Al agregar este prefijo, en nuestros enlaces debemos colocar dicho prefijo: ejemplo:  <a href="#!/phones/{{phone.id}}>..."
				$routeProvider.when('/login',{
					template: '<login-becas></login-becas>'
				}).
				when('/registro',{
					template: '<registro-form></registro-form>'
				}).
				when('/entrada', {
					template: '<h2>Modulo Entrada</h2>'
				}).
				when('/notificacion', {
					template: '<notificacion-registro></notificacion-registro>'
				}).
				when('/cartaProtesta', {
					template: '<modulo-beca6></modulo-beca6>'
				}).
				otherwise('/login');
			}
		]);
