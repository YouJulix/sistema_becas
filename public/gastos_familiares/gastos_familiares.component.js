angular.
	module('gastosFamiliares').
		component('gastosFamiliares', {
			templateUrl: 'gastos_familiares/gastos_familiares.template.html',
			controller: ['$http','$scope', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function gastosFamiliaresController($http,$scope){
					var self = this; //BUena practica es no manipular el this directamente
					
					
					self.msgerror = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					self.solicitudId=localStorage.getItem("idSolicitud");
					console.log(self.solicitudId);
					self.method="POST";
					object = $http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/gastos_familiares/'+ self.solicitudId
					}).success(function(data){
						object = data[0];
						console.log(object);
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
						//console.log(self.solicitudId);
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
							console.log(gastosfam);
							//if(typeof(gastosfam) == "object"){
								window.location = "/#!/cartaProtesta";
							//}
						}).error(function(err){
							console.log(err);
						});
					},
					self.volver = function(){
						window.location = "/#!/informacion_hogar";
					}
				}
			]
		});
