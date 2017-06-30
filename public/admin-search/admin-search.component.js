angular.
	module('adminSearch').
		component('adminSearch', {
			templateUrl: 'admin-search/admin-search.template.html',
			controller: ['$http', '$scope',//Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function adminSearchController($http,$scope){
					var self = this; //BUena practica es no manipular el this directamente
					
					self.clear = function(){
						localStorage.clear();
						window.location = "/#!/login";
					}

					self.msgerror = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					self.infoper = true;
					//console.log("sdds");
					object = $http({
					method 	: 	'GET',
					url 	: 	'http://localhost:8000/api/v1.0/users/'
					}).success(function(data){
						if(data.length > 0 ){
							$('.collapsible').collapsible();
							self.msgerror = true;
							self.infoper = false;
							$scope.resultado = data;
							$scope.resultados = [];
							angular.forEach($scope.resultado, function(res){
								//console.log(res);
								if((!res.isAdmin) && (res.matricula != "adminSuper"))
									$scope.resultados.push(res);
							});
							//console.log($scope.dato);
						}else{
							self.infoper = true;
							self.msgerror = false;
						}
					}).error(function(err){
						console.log(err);
					});

					self.solicitudes = function(matricula){
						//alert(matricula);
						object = $http({
							method : 'GET',
							url    : 'http://localhost:8000/api/v1.0/solicitudes/'+ matricula
						}).success(function(data){
							$scope.solicitudes = [];
							$scope.solicitud = data;
							//console.log($scope.solicitud);
							angular.forEach($scope.solicitud, function(sol){
								$scope.solicitudes.push(sol);
							});
							//console.log($scope.solicitudes);
						}).error(function(err){
							console.log(err);
						});
					}

					/*self.busqueda = function(){
						//console.log(self.matricula);
						object = $http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/users/'+ self.matricula
						}).success(function(data){
							if(data.length > 0 ){
								self.msgerror = true;
								self.infoper = false;
								$scope.dato = data[0];
								//console.log($scope.dato);
								object = $http({
									method : 'GET',
									url    : 'http://localhost:8000/api/v1.0/solicitudes/'+ self.matricula 
								}).success(function(data){
									$scope.solicitudes = [];
									$scope.solicitud = data;
									//console.log($scope.solicitud);
									angular.forEach($scope.solicitud, function(sol){
										$scope.solicitudes.push(sol);
									});
									//console.log($scope.solicitudes);
								}).error(function(err){
									console.log(err);
								}); 
							}else{
								self.infoper = true;
								self.msgerror = false;
								$scope.dato.matricula = "";
								$scope.dato.carrera = "";
								$scope.dato.nombre = "";
								$scope.dato.apellido1 = "";
								$scope.dato.apellido2 = "";
								$scope.dato.semestre = "";
								$scope.solicitudes = [];
							}
						}).error(function(err){
							console.log(err);
						});
					};*/
					$scope.detalle = function(idmat,mat){
						localStorage.setItem("idSolicitud",idmat);
						localStorage.setItem("matricula",mat);
						window.location = "/#!/detalles_solicitud_admin";
					/*$scope.detalle = function(idmat){
						localStorage.setItem("idSolicitud",idmat);
						
					};*/
					}
					$scope.modificar = function(idmat){
						localStorage.setItem("idSolicitud",idmat);
						window.location = "/#!/gastos_alumno";
					};
					$scope.remove = function(idmat){
						//console.log(idmat);
						confirmar=confirm("Esta seguro que desea eliminar"); 
						if(confirmar){  
					        $http({ 
					            	method: 'DELETE',
							url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idmat
					        }).success(function(data){
					        	self.busqueda();
					        	window.location = "/#!/admin_principal";
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
