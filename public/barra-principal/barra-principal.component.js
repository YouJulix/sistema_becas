angular.
	module('barraPrincipal').
		component('barraPrincipal',{
			templateUrl: 'barra-principal/barra-principal.template.html',
			controller: ['$http',
				
				function ComponentBarraPrincipal($http){
					var self = this;
					
					//Metodo para saber si quien intenta acceder esta logeado===//
					if(localStorage.getItem("isAdmin") == null){
						console.log("El usuario no esta loggeado");
						window.location = "/#!/login";
					}


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

				}]
			});