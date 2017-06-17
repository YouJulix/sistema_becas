angular.
	module('moduloBeca2').
		component('moduloBeca2', {
			templateUrl: 'modulo-beca2/modulo-beca2.template.html',
			controller: ['$http',
				function ModuloBeca2Controller($http){
					var self=this;
							
					self.solicitudId=localStorage.getItem("idSolicitud");
					/**Obtener los datos guardados*/
					self.method="POST";
					object = $http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/ingresoMensual/'+ self.solicitudId
					}).success(function(data){
						object = data[0];
						console.log(object);
						if(object){
							self.ingresoMenJefe	= parseInt(object.ingresoMenJefe);
							self.ingresoMenGubernamental = parseInt(object.ingresoMenGubernamental);
							self.ingresoMenTerceros = parseInt(object.ingresoMenTerceros);
							self.method="PUT";
						}else{
							self.ingresoMenJefe	= 0;	
							self.ingresoMenGubernamental = 0;	
							self.ingresoMenTerceros = 0;	
						}   
					}).error(function(err){
						console.log(err);
					});
					
					
					self.addIngresoMensual = function(){
						
						self.data = {
							"solicitudId"	: self.solicitudId,
							"ingresoMenJefe": self.ingresoMenJefe,
							"ingresoMenGubernamental" : self.ingresoMenGubernamental,
							"ingresoMenTerceros"      : self.ingresoMenTerceros
						};
						console.log(self.method);
						$http({
							
							method: self.method,
							url: 'http://localhost:8000/api/v1.0/ingresoMensual',
							data: self.data
						}).success(function(ingresos){
							if(typeof(ingresos) == "object"){
								window.location = "#!/gastos_alumno";
							}
						}).error(function(error){
							console.log(error);
							alert("Error al agregar ingresos mensuales");
						});
					}
					
				}
			]
		});
