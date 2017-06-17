angular.
	module('adminSearch').
		component('adminSearch', {
			templateUrl: 'admin-search/admin-search.template.html',
			controller: ['$http', '$scope',//Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function adminSearchController($http,$scope){
					var self = this; //BUena practica es no manipular el this directamente
<<<<<<< HEAD
					
					self.clear = function(){
						localStorage.clear();
						window.location = "/#!/login";
					}

=======
>>>>>>> 7c82c0d98a9480463556c9a6ab6900877981498e
					self.msgerror = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					//console.log("sdds");
					self.busqueda = function(){
						//console.log(self.matricula);
						object = $http({
						method 	: 	'GET',
<<<<<<< HEAD
<<<<<<< HEAD
						url 	: 	'http://192.168.43.247:8000/api/v1.0/users/'+ self.matricula
=======
						url 	: 	'http://localhost:8000/api/v1.0/users/'+ self.matricula
>>>>>>> 7c82c0d98a9480463556c9a6ab6900877981498e
=======
						url 	: 	'http://localhost:8000/api/v1.0/users/'+ self.matricula
>>>>>>> 882f559b38eb3875f59ebc5d3de5490577e8681b
						}).success(function(data){
							$scope.dato = data[0];
							console.log($scope.dato);
							object = $http({
								method : 'GET',
<<<<<<< HEAD
<<<<<<< HEAD
								url    : 'http://192.168.43.247:8000/api/v1.0/solicitudes/'+ self.matricula 
=======
								url    : 'http://localhost:8000/api/v1.0/solicitudes/'+ self.matricula 
>>>>>>> 7c82c0d98a9480463556c9a6ab6900877981498e
=======
								url    : 'http://localhost:8000/api/v1.0/solicitudes/'+ self.matricula 
>>>>>>> 882f559b38eb3875f59ebc5d3de5490577e8681b
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
<<<<<<< HEAD
					$scope.detalle = function(idmat,mat){
						localStorage.setItem("idSolicitud",idmat);
						localStorage.setItem("matricula",mat);
=======
					$scope.detalle = function(idmat){
						localStorage.setItem("idSolicitud",idmat);
>>>>>>> 7c82c0d98a9480463556c9a6ab6900877981498e
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
<<<<<<< HEAD
<<<<<<< HEAD
								url: 'http://192.168.43.247:8000/api/v1.0/solicitudes/id/' + idmat
=======
								url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idmat
>>>>>>> 7c82c0d98a9480463556c9a6ab6900877981498e
=======
								url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idmat
>>>>>>> 882f559b38eb3875f59ebc5d3de5490577e8681b
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
<<<<<<< HEAD
		});
=======
		});
>>>>>>> 7c82c0d98a9480463556c9a6ab6900877981498e
