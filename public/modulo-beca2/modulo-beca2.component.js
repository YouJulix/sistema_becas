angular.
	module('moduloBeca2').
		component('moduloBeca2', {
			templateUrl: 'modulo-beca2/modulo-beca2.template.html',
			controller: ['$http',
				function ModuloBeca2Controller($http){
					var self=this;
					
					//metodo para dicernir visualmente si es admin o alumno ===Ed=
					if(localStorage.getItem("isAdmin")){						//
						self.solicitudToMenu = "Menú principal";				//	
					}else{														//
						self.solicitudToMenu = "Regresar a solicitudes";		//
					}															//
					//==========================================================//
					
					//=Cambiar la locacion de la pagina en base a si es admin o no Ed=
					self.menuChangue = function(){									//
						if(localStorage.getItem("isAdmin")){
							console.log("is admin to #!menu_admin");				//
							window.location = "/#!/menu_admin";						//	
						}else{														//
							console.log("is not admin to #!solicitudes");
							window.location = "/#!/solicitudes";						//
						}															//
					}																//
					//================================================================
					
					
					
					self.solicitudId=localStorage.getItem("idSolicitud");
					/**Obtener los datos guardados*/
					self.method="POST";
					object = $http({
						method 	: 	'GET',
						url 	: 	'http://192.168.43.247:8000/api/v1.0/ingresoMensual/'+ self.solicitudId
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
							url: 'http://192.168.43.247:8000/api/v1.0/ingresoMensual',
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