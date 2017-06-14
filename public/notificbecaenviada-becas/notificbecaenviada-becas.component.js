angular.
	module('notificbecaenviadaBecas').
		component('notificbecaenviadaBecas', {
			templateUrl: 'notificbecaenviada-becas/notificbecaenviada-becas.template.html',

			controller:['$http', '$scope',
				function NotificbecaenviadaBecasController($http,$scope){
					var self = this; //BUena practica es no manipular el this directamente
					//self.dataValid = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					//self.validateData = function(){

						//alert("hola");
					//}
					$scope.matricula = "";
					//localStorage.setItem("matricula","23232");
					

					

					self.validar = function(){
						$scope.matricula = localStorage.getItem("matricula");


						console.log(localStorage.getItem("matricula"));

						if($scope.matricula == null){
							window.location = "/#!/login";
						}
					};

					self.validar();


			   		
				    $scope.cerrarSesion = function() {
				    	//alert("entra");
				        localStorage.removeItem("matricula");
				        window.location = "/#!/login";
				    }

				}
				]
		});