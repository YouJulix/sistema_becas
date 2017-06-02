angular.
	module('notificacionRegistro').
		component('notificacionRegistro', {
			templateUrl: 'notificacion-registro/notificacion-registro.template.html',
			controller: ['$http', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function NotificacionRegistroController($http){
									
				}
			]
		});
