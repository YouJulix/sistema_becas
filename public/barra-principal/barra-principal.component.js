angular.
	module('barraPrincipal').
		component('barraPrincipal',{
			templateUrl: 'barra-principal/barra-principal.template.html',
			controller: ['$http',
				function ComponentBarraPrincipal($http){
					//metodo para dicernir visualmente si es admin o alumno ===Ed=
					if(localStorage.getItem("isAdmin") == "true"){				//
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
							console.log("is not admin to #!solicitudes");           //
							window.location = "/#!/solicitudes";					//
						}															//
					}																//
					//================================================================
				}]
			});