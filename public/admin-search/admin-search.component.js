angular.
	module('adminSearch').
		component('adminSearch', {
			templateUrl: 'admin-search/admin-search.template.html',
			controller: ['$http', '$scope',//Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function adminSearchController($http,$scope){
					var self = this; //BUena practica es no manipular el this directamente
					self.msgerror = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					//console.log("sdds");
					self.busqueda = function(){
						//console.log(self.matricula);
						object = $http({
						method 	: 	'GET',
						url 	: 	'http://192.168.43.247:8000/api/v1.0/users/'+ self.matricula
						}).success(function(data){
							$scope.dato = data[0];
							console.log($scope.dato);
							object = $http({
								method : 'GET',
								url    : 'http://192.168.43.247:8000/api/v1.0/solicitudes/'+ self.matricula 
							}).success(function(data){
								$scope.solicitudes = [];
								$scope.solicitud = data;
								console.log($scope.solicitud);
								angular.forEach($scope.solicitud, function(sol){
									$scope.solicitudes.push(sol);
								});
								console.log($scope.solicitudes);
							}).error(function(err){
								console.log(err);
							});  
						}).error(function(err){
							console.log(err);
						});
					};
					$scope.detalle = function(idmat){
						localStorage.setItem("idSolicitud",idmat);
						window.location = "/#!/detalles_solicitud_admin";
					};
					$scope.modificar = function(idmat){
						localStorage.setItem("idSolicitud",idmat);
						window.location = "/#!/dependencia_economica";
					};
					$scope.remove = function(idmat){
						console.log(idmat);
						confirmar=confirm("Esta seguro que desea eliminar"); 
						if(confirmar){  
					        $http({ 
					            method: 'DELETE',
								url: 'http://192.168.43.247:8000/api/v1.0/solicitudes/id/' + idmat
					        }).success(function(data){
					        	self.busqueda();
					        	window.location = "/#!/admin_seach";
					        }).
							error(function(){
								alert('Error al intentar recuperar el cliente');
							});
						}
					};
					$scope.editinfo = function(){
						localStorage.setItem("alumno",self.matricula);
						window.location = "/#!/edit-user";
					}		
				}
			]
		});
