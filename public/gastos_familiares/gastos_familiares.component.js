angular.
	module('gastosFamiliares').
		component('gastosFamiliares', {
			templateUrl: 'gastos_familiares/gastos_familiares.template.html',
			controller: ['$http','$scope', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function gastosFamiliaresController($http,$scope){
					var self = this; //BUena practica es no manipular el this directamente
					
					
					if(localStorage.getItem("isAdmin") == "true"){		//
						self.terminar = "Terminar";						//
					}else{												//
						self.terminar = "Continuar";				   	//
					}					


					self.msgerror = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					self.solicitudId=localStorage.getItem("idSolicitud");
					//console.log(self.solicitudId);
					self.method="POST";

					object= $http({
						method : 'GET',
						url : 'http://localhost:8000/api/v1.0/ingresoMensual/' + self.solicitudId
 					}).success(function(data){
 						$scope.dato = data[0];
						console.log($scope.dato);
						$scope.dato.ingreso = parseInt($scope.dato.ingresoMenGubernamental) + parseInt($scope.dato.ingresoMenJefe) + parseInt($scope.dato.ingresoMenTerceros);
					}).error(function(err){
						console.log(err);
					});

					object = $http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/gastos_familiares/'+ self.solicitudId
					}).success(function(data){
						object = data[0];
						//console.log(object);
						if(object){
							self.agua = parseInt(object.agua);
							self.luz = parseInt(object.luz);
							self.telefono = parseInt(object.telefono);
							self.gas =parseInt(object.gas);
							self.educacion =parseInt(object.educacion);
							self.transporte =parseInt(object.transporte);
							self.rentadomicilio =parseInt(object.rentadomicilio);
							self.television =parseInt(object.television);
							self.internet =parseInt(object.internet);
							self.alimentacion =parseInt(object.alimentacion);
							self.vestido =parseInt(object.vestido);
							self.medico=parseInt(object.medico);
							self.diversion=parseInt(object.diversion);
							self.otro=parseInt(object.otro);
							self.method="PUT";
						}else{
							self.agua = 0;
							self.luz = 0;
							self.telefono = 0;
							self.gas =0;
							self.educacion =0;
							self.transporte =0;
							self.rentadomicilio =0;
							self.television =0;
							self.internet =0;
							self.alimentacion =0;
							self.vestido =0;
							self.medico=0;
							self.diversion=0;
							self.otro=0;	
						}   
					}).error(function(err){
						console.log(err);
					});
					self.validat  = function(){
						//console.log("Im here");
						//console.log(self.solicitudId);
						if(self.agua > 0 && self.agua < 50){
							//alert("Gasto mensual de agua por familia, incorrecto rango de 50-25000");
							$('#modalErrorAgua').modal('open');
							return;	
						}
						if(self.luz > 0 && self.luz < 50){
							//alert("Gasto mensual de luz por familia, incorrecto rango de 50-25000");
							$('#modalErrorLuz').modal('open');
							return;	
						}
						if(self.telefono > 0 && self.telefono < 50){
							//alert("Gasto mensual de telefono por familia, incorrecto rango de 50-25000");
							$('#modalErrorTelefono').modal('open');
							return;	
						}
						if(self.gas > 0 && self.gas < 50){
							//alert("Gasto mensual de gas por familia, incorrecto rango de 50-25000");
							$('#modalErrorGas').modal('open');
							return;	
						}
						if(self.educacion > 0 && self.educacion < 50){
							//alert("Gasto mensual de educacion por familia, incorrecto rango de 50-25000");
							$('#modalErrorEducacion').modal('open');
							return;	
						}
						if(self.transporte > 0 && self.transporte < 50){
							//alert("Gasto mensual de transporte por familia, incorrecto rango de 50-25000");
							$('#modalErrorTransporte').modal('open');
							return;	
						}
						if(self.rentadomicilio > 0 && self.rentadomicilio < 50){
							//alert("Gasto mensual de renta por familia, incorrecto rango de 50-25000");
							$('#modalErrorRenta').modal('open');
							return;	
						}
						if(self.television > 0 && self.television < 50){
							//alert("Gasto mensual de television por familia, incorrecto rango de 50-25000");
							$('#modalErrorTelevision').modal('open');
							return;	
						}
						if(self.internet > 0 && self.internet < 50){
							//alert("Gasto mensual de internet por familia, incorrecto rango de 50-25000");
							$('#modalErrorInternet').modal('open');
							return;	
						}
						if(self.alimentacion > 0 && self.alimentacion < 50){
							//alert("Gasto mensual de alimentacion por familia, incorrecto rango de 50-25000");
							$('#modalErrorAlimentacion').modal('open');
							return;	
						}
						if(self.vestido > 0 && self.vestido < 50){
							//alert("Gasto mensual de vestido por familia, incorrecto rango de 50-25000");
							$('#modalErrorVestido').modal('open');
							return;	
						}
						if(self.medico > 0 && self.medico < 50){
							//alert("Gasto mensual de medico por familia, incorrecto rango de 50-25000");
							$('#modalErrorMedico').modal('open');
							return;	
						}
						if(self.diversion > 0 && self.diversion < 50){
							//alert("Gasto mensual de diversion por familia, incorrecto rango de 50-25000");
							$('#modalErrorDiversion').modal('open');
							return;	
						}
						if(self.otro > 0 && self.otro < 50){
							//alert("Gasto mensual de otros gastos por familia, incorrecto rango de 50-25000");
							$('#modalErrorOtro').modal('open');
							return;	
						}

						/*self.total = self.agua + self.luz + self.telefono + self.gas + self.educacion + self.transporte 
								+ self.rentadomicilio + self.television + self.internet + self.alimentacion + self.vestido
									+self.medico + self.diversion + self.otro;

						if(self.total > $scope.dato.ingreso){
							alert("La suma de los fastos familiares es mayor a su ingreso mensual");
							return;
						}*/
						
						self.data = {
							"solicitudId"	: self.solicitudId,
							"agua"          : self.agua,
							"luz"           : self.luz,
							"telefono"      : self.telefono,
							"gas"           : self.gas,
							"educacion"     : self.educacion,
							"transporte"    : self.transporte,
							"rentadomicilio": self.rentadomicilio,
							"television"    : self.television,
							"internet"      : self.internet,
							"alimentacion"  : self.alimentacion,
							"vestido"       : self.vestido,
							"medico"        : self.medico,
							"diversion"     : self.diversion,
							"otro"          : self.otro
						};
						//console.log(self.data);
						$http({
							method : self.method,
							url    : 'http://localhost:8000/api/v1.0/gastos_familiares/',
							data   : self.data
						}).success(function(gastosfam){
							window.location = "/#!/beca/informacion_hogar";
							//console.log(gastosfam);
							//if(typeof(gastosfam) == "object"){
								/*if(localStorage.getItem("isAdmin") == "true"){
									//console.log("isAdmin return to admin_principal");		
									window.location = "/#!/admin_principal";   				
								}else{
									//console.log("is not Admin return to cartaProtesta");
									window.location = "/#!/cartaProtesta";
								}*/
							//}
						}).error(function(err){
							console.log(err);
						});
					},
					self.volver = function(){
						window.location = "/#!/beca/gastos_alumno";
					}
				}
			]
		});
