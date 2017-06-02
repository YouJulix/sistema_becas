angular.
	module('moduloBeca6').
		component('moduloBeca6', {
			templateUrl: 'modulo-beca6/modulo-beca6.template.html',
			controller: ['$http', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function ModuloBeca6Controller($http){
									
				}
			]
		});
