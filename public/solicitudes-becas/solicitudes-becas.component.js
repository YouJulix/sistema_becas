angular.
	module('solicitudesBecas').
		component('solicitudesBecas', {
			templateUrl: 'solicitudes-becas/solicitudes-becas.template.html',

			controller: ['$http', '$scope',//Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function SolicitudesBecasController($http,$scope){

					$scope.datos = {}; //declarar arreglo de arreglos

					$scope.pendientes = [];
					$scope.terminados = [];

					//$scope.valor = 5; //ejemplo para declarar variables

					var self = this; //BUena practica es no manipular el this directamente
					//self.matricula = '12345'; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					
					//localStorage.setItem("matricula","12345");

					self.validar = function(){
						$scope.matricula = localStorage.getItem("matricula");
					


						console.log(localStorage.getItem("matricula"));

						if($scope.matricula == null){
							window.location = "/#!/login";
						}
					};

					self.validar();


					
					self.imprimir = function(){
						$scope.datos = {};
						
						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/solicitudes/'+$scope.matricula

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									//self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{

										$scope.datos = data;

										$scope.pendientes = [];
										$scope.terminados = [];

										
										//guardar las solicitudes pendientes en un arreglo
										angular.forEach($scope.datos, function(solicitudes){

											if(solicitudes.estado == 'pendiente')
												$scope.pendientes.push(solicitudes);

											
											if(solicitudes.estado == 'terminado')
												$scope.terminados.push(solicitudes);

											
										});

								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).
						error(function(){
							alert('Error al intentar recuperar el cliente');
						});

					}

					self.imprimir();


					self.imprimirDatos = function(){
						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/users/' + $scope.matricula

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									//self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{
									//alert(data[0].matricula);

									$scope.dato = data;
								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).
						error(function(){
							alert('Error al intentar recuperar el cliente');
						});
					}

					self.imprimirDatos();


					$scope.remove = function(idm){

						confirmar=confirm("Esta seguro que desea eliminar"); 
						if(confirmar){  

					        $http({ 
					            method: 'DELETE',
								url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idm
					        }).success(function(data){
					        	self.imprimir();
					        	window.location = "/#!/solicitudes";
					        }).

						$http({ 
						    method: 'DELETE',
								url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idm
						}).success(function(data){
							self.imprimir();
							window.location = "/#!/solicitudes";
						}).

							error(function(){
								alert('Error al intentar recuperar el cliente');
							});
						}

					};


					$scope.modificar = function(id){
						localStorage.setItem("idsolicitud",id);
						window.location = "/#!/dependencia_economica";


					};

					$scope.agregar = function(id){
						var f = new Date();
						var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
						

					    $http({
					        url: 'http://localhost:8000/api/v1.0/solicitudes/',
					        method: "POST",
					        data: { 								
					        	'estado' : "pendiente",
								'porcentaje_sugerido' : 0,
								'porcentaje_final' : 0,
								'libre_de_extra' : false,
								'biblioteca_completa' : false,
								'fecha_envio' : fecha,
								'matricula' : $scope.matricula }
					    }).success(function (data, status, headers, config) {
			                localStorage.setItem("idsolicitud",data._id);
			            	//alert(data._id);
			            	window.location = "/#!/dependencia_economica";
			            }).error(function (data, status, headers, config) {
			                alert('Error al intentar recuperar el cliente');
			            });


					//Sugerencia... podrian ser la misma funcion
					$scope.modificar = function(id){
						localStorage.setItem("idSolicitud",id);
						window.location = "/#!/dependencia_economica";


					};

					$scope.agregar = function(id){
					    var f = new Date();
					    var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();


					    $http({
							url: 'http://localhost:8000/api/v1.0/solicitudes/',
							method: "POST",
							data: { 								
								'estado' : "pendiente",
									'porcentaje_sugerido' : 0,
									'porcentaje_final' : 0,
									'libre_de_extra' : false,
									'biblioteca_completa' : false,
									'fecha_envio' : fecha,
									'matricula' : $scope.matricula }
						    }).success(function (data, status, headers, config) {
						localStorage.setItem("idSolicitud",data._id);
						//alert(data._id);
						window.location = "/#!/dependencia_economica";
					    }).error(function (data, status, headers, config) {
						alert('Error al intentar recuperar el cliente');
					    });


					};


					$scope.cerrarSesion = function() {

				  
				        localStorage.removeItem("matricula");
				        window.location = "/#!/login";
				    }

					  
					        localStorage.removeItem("matricula");
					        window.location = "/#!/login";
					}










					//}
				}
			]
		});
