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
						url 	: 	'http://l92.168.43.247:8000/api/v1.0/ingresoMensual/'+ self.solicitudId
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
						console.log(self.ingresoMenJefe);
						if( (self.ingresoMenJefe <500 || self.ingresoMenJefe >=25000) || (self.ingresoMenGubernamental <500 || self.ingresoMenGubernamental >=25000 ) || (self.ingresoMenTerceros <500 || self.ingresoMenTerceros >=25000) ){
							alert("ingresa cantidades en el rango de 500-25,000");
							return;
						}
						
						$http({
							method: self.method,
							url: 'http://l92.168.43.247:8000/api/v1.0/ingresoMensual',
							data: 'ingresoMenJefe='+self.ingresoMenJefe+
								'&ingresoMenGubernamental='+self.ingresoMenGubernamental+
								'&ingresoMenTerceros='+self.ingresoMenTerceros+
								'&solicitudId='+localStorage.getItem('idSolicitud'),
								headers: {'Content-Type':'application/x-www-form-urlencoded'}
						}).
						success(function(data){
							//alert("ingresos mensuales guardados");
							window.location = "#!/gastos_alumno";
							console.log(data);
						}).
						error(function(data){
							console.log(data);
							alert("Error al agregar ingresos mensuales");
						});
					}
					
				}
			]
		});
