angular.
	module('barraPrincipal').
		component('barraPrincipal',{
			templateUrl: 'barra-principal/barra-principal.template.html',
			controller: ['$http',
				
				function ComponentBarraPrincipal($http){
					var self = this;
					//metodo para dicernir visualmente si es admin o alumno ===Ed=
					if(localStorage.getItem("isAdmin") == "true"){				//
						self.solicitudToMenu = "Menú principal";				//	
					}else{														//
						self.solicitudToMenu = "Regresar a solicitudes";		//
					}															//
					//==========================================================//
					
					//=Cambiar la locacion de la pagina en base a si es admin o no Ed=
					self.menuChangue = function(){									//
						if(localStorage.getItem("isAdmin") == "true"){
							console.log("is admin to #!menu_admin");				//
							window.location = "/#!/admin_principal";
																					//	
						}else{														//
							console.log("is not admin to #!solicitudes");           //
							window.location = "/#!/solicitudes";					//
						}															//
					}																//
					//================================================================

					self.closeApp =  function(){
						localStorage.clear();
						window.location = "/#!/login";
					}


					self.CancelarSolicitud = function(){

						//console.log("==================");

						self.id = localStorage.getItem("idSolicitud");	

						confirmar=confirm("Esta seguro que desea eliminar"); 
						if(confirmar){  

				            $http['delete']('http://localhost:8000/api/v1.0/solicitudes/id/' + self.id).success(function() {
				              	
					        	

					        	////////////////////////////////////////
					        	$http['delete']('http://localhost:8000/api/v1.0/ingresoMensual/' + self.id).success(function() {
					        	});
					        	$http['delete']('http://localhost:8000/api/v1.0/gastos/' + self.id).success(function() {
					        	});
					        	$http['delete']('http://localhost:8000/api/v1.0/informacionHogar/' + self.id).success(function() {
					        	});
					        	$http['delete']('http://localhost:8000/api/v1.0/gastos_familiares/' + self.id).success(function() {
					        	});
					        	////////////////////////////////////////

					        	window.location = "/#!/solicitudes";

				            });
						}

					}





				}]
			});