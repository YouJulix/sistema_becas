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
					$scope.biblioteca_completa = false;
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
						
						$scope.idsolicitud = localStorage.getItem("idsolicitud");

						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/ingresoMensual/'+$scope.idsolicitud,

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
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
										//console.log($scope.suma);
										//console.log("----------");

										$scope.perCapita = (($scope.suma/30) /80.04);
										$scope.perCapita = ($scope.perCapita * 640.74);

										//console.log($scope.perCapita);
										//console.log("----------");

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
										console.log($scope.idsolicitud);
										/////////////////////////////extraer datos de solicitudes
										$http({
											method: 'GET',
											url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + $scope.idsolicitud,

										}).success(function(data){
											console.log(data);
											//alert("success "+data)
											console.log(data);
											if(typeof(data) == 'object'){
												//console.log(data);
												if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
													//self.dataValid = false; //Boolean activará mensaje de error en la vista
												}else{
													
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
														
											        }).
													error(function(){
														alert('Error al intentar recuperar el cliente');
													});

													//////////////////////////////////////////////////



												}
											}else{
												alert('Error al intentar recuperar el cliente');
											}
										}).error(function(){
											alert('Error al intentar recuperar el cliente');
										});




								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).
						error(function(){
							alert('Error al intentar recuperar el cliente');
						});


						

					};





					$scope.cerrarSesion = function() {
				  
				        localStorage.removeItem("matricula");
				        window.location = "/#!/login";
				    }
				}
			]
		});
