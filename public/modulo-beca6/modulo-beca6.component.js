angular.
	module('moduloBeca6').
		component('moduloBeca6', {
			templateUrl: 'modulo-beca6/modulo-beca6.template.html',
			controller: ['$http','$scope', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function ModuloBeca6Controller($http,$scope){

					var self = this;
					 
					
					$scope.datos = {}; //declarar arreglo de arreglos

					$scope.ingresoMenJefe = 0 ;
					$scope.ingresoMenGubernamental = 0;
					$scope.ingresoMenTerceros = 0;
					$scope.solicitudId = "";
					$scope.suma = 0;
					$scope.perCapita = 0;
					$scope.becaSugerida = 0;

					$scope.matricul = "";
					$scope.estado = "" ;
					$scope.porcentaje_sugerido = 0 ;
					$scope.porcentaje_final = 0 ;
					$scope.libre_de_extra = false;
					$scope.biblioteca_completa = true;
					$scope.fecha_envio = "";



									
					self.validar = function(){
						$scope.matricula = localStorage.getItem("matricula");
					
						console.log(localStorage.getItem("matricula"));

						if($scope.matricula == null){
							window.location = "/#!/login";
						}
					};

					self.validar();

					$scope.aceptar = function(){
						//console.log(document.getElementById("aceptare").checked);
						if(document.getElementById("aceptare").checked == true ){
							$scope.aceptar1();
						}else{
							alert("Deberá Aceptar Condiciones");
						}
					}

					$scope.aceptar1 = function(){

						$scope.idsolicitud = localStorage.getItem("idSolicitud");

						//ingreso mensual
						$http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/ingresoMensual/'+ $scope.idsolicitud,
						async : true
						}).success(function(data){
							object = data[0];
							//console.log(object);
							if(!object){
								alert("Falta Agregar Ingreso Mensual");
								window.location = "/#!/ingreso_mensual";
							}else{
								//gastos del alumno
								$http({
									method 	: 	'GET',
									url 	: 	'http://localhost:8000/api/v1.0/gastos/'+ $scope.idsolicitud,
									async : true
								}).success(function(data){
									object = data[0];
									console.log(object);
									if(!object){
										alert("Falta Ingresar Datos Del Alumno");
										window.location = "/#!/gastos_alumno";
									}else{


										//informacion del hogar
										object = $http({
											method 	: 	'GET',
											url 	: 	'http://localhost:8000/api/v1.0/informacionHogar/'+ $scope.idsolicitud,
											async : true
										}).success(function(data){
											object = data[0];
											//console.log(object);
											if(!object){
												alert("Falta Ingresar Informacion Del Hogar");
												window.location = "/#!/informacion_hogar";
											}else{
												//gastos familiares
												$http({
													method 	: 	'GET',
													url 	: 	'http://localhost:8000/api/v1.0/gastos_familiares/'+ $scope.idsolicitud,
													async : true
												}).success(function(data){
													object = data[0];
													//console.log(object);
													if(!object){
														alert("Falta Ingresar Gastos Familiares");
														window.location = "/#!/gastos_familiares";
													}else{
														$scope.aceptar2();
													}
												}).error(function(err){
													console.log(err);
												});
											}
										}).error(function(err){
											console.log(err);
										});


									}
								}).error(function(err){
									console.log(err);
								});
							}
						}).error(function(err){
							console.log(err);
						});

						
					}	



					$scope.aceptar2 = function(){

						//Funcion para enviar solicitud

						/////////////////////////////////////////////////////////////////////
						
						
						$scope.idsolicitud = localStorage.getItem("idSolicitud");

						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/ingresoMensual/'+$scope.idsolicitud

						}).success(function(data){
						
							if(typeof(data) == 'object'){
								
								if(data != ""){

										$scope.datos = data; //guardar objeto json

										$scope.ingresoMenJefe = $scope.datos[0].ingresoMenJefe ;
										$scope.ingresoMenGubernamental = $scope.datos[0].ingresoMenGubernamental ;
										$scope.ingresoMenTerceros = $scope.datos[0].ingresoMenTerceros ;
										$scope.solicitudId = $scope.datos[0].solicitudId;
										
										console.log($scope.ingresoMenJefe);
										console.log($scope.ingresoMenGubernamental);
										console.log($scope.ingresoMenTerceros);
										console.log($scope.solicitudId);


										$scope.suma = parseInt($scope.ingresoMenJefe) + parseInt($scope.ingresoMenGubernamental) + parseInt($scope.ingresoMenTerceros);
										
										//calcular porcentaje de beca sugerida
										$scope.perCapita = (($scope.suma/30) /80.04);
										$scope.perCapita = ($scope.perCapita * 640.74);

										

										if($scope.perCapita < 2562.97){
											$scope.becaSugerida = 100;
										}else if($scope.perCapita < 5125.93){
											$scope.becaSugerida = 75;
										}else if($scope.perCapita < 7688.90){
											$scope.becaSugerida = 50;
										}else if($scope.perCapita < 10251.86){
											$scope.becaSugerida = 25;
										}else if($scope.perCapita > 10251.86 ){
											$scope.becaSugerida = 0;
										}

										console.log($scope.becaSugerida);

										console.log("++++++++++");
										
										/////////////////////////////extraer datos de solicitudes
										$http({
											method: 'GET',
											url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + $scope.idsolicitud,

										}).success(function(data){
											console.log(data);
											//alert("success "+data)
											console.log(data);
											if(typeof(data) == 'object'){
												console.log(data);
												if(data != ""){
													
														$scope.datos = data;
														//console.log(datos);
														$scope.matricul = $scope.datos.matricula;
														$scope.estado = $scope.datos.estado ;
														$scope.porcentaje_sugerido = $scope.datos.porcentaje_sugerido ;
														$scope.porcentaje_final = $scope.datos.porcentaje_final ;
														$scope.libre_de_extra = $scope.datos.libre_de_extra;
														$scope.biblioteca_completa = $scope.datos.biblioteca_completa;
														$scope.fecha_envio = $scope.datos.fecha_envio;


														/////////////////////////////actualizar datos de solicitudes
														/////////////////////////////////////////////////
														var f = new Date();
														var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();

														$http({
													        url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + $scope.idsolicitud,
													        method: "PUT",
													        data: { 								
													        	'estado' : "terminado",
																'porcentaje_sugerido' : $scope.becaSugerida,
																'porcentaje_final' : $scope.porcentaje_final,
																'libre_de_extra' : $scope.libre_de_extra,
																'biblioteca_completa' : $scope.biblioteca_completa,
																'fecha_envio' : fecha,
																'matricula' : $scope.matricula }
													    }).success(function(data){
													    	localStorage.removeItem("idSolicitud");
															window.location = "/#!/notificbecaenviada";
												        }).error(function(){
															alert('! ERROR No se envio la solicitud!');
														});


														//////////////////////////////////////////////////
													}
												}else{
													alert('! ERROR No se encontro la solicitud en la base de datos!');
												}

										}).error(function(){
											alert('! ERROR No se encontro la solicitud en la base de datos !');
										});

								}


							}else{
								alert('! No se encontro el ingreso mensual !');
							}
						})
						.error(function(){
							alert('! No se encontro el ingreso mensual !');
						});


						

					}


					$scope.cerrarSesion = function() {
				  
				        localStorage.clear();
				        window.location = "/#!/login";
				    }

				    $scope.regresar = function() {
				    	window.location = "/#/gastos_familiares"
				    }
				}
			]
		});
