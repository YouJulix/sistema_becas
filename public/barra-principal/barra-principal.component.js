angular.
	module('barraPrincipal').
		component('barraPrincipal',{
			templateUrl: 'barra-principal/barra-principal.template.html',
			controller: ['$http', '$routeParams',
				function ComponentBarraPrincipal($http,$routeParams){
					var self = this;
					self.nombre = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido1");
					
					self.alumno = "waves-effect";
					self.familia= "waves-effect";
					self.depende= "waves-effect";
					self.hogar  = "waves-effect";
					self.ingreso= "waves-effect";
					self.cartap  = "waves-effect";
					console.log($routeParams.section);

					switch($routeParams.section){
						case "gastos_alumno":
							self.alumno = "grey darken-2";
						 	break;
						case "gastos_familiares":
							self.familia = "grey darken-2";
						 	break;
						case "informacion_hogar":
							self.hogar = "grey darken-2";
						 	break;
						case "dependencia_economica":
							self.depende = "grey darken-2";
						 	break;
						case "ingreso_mensual":
							self.ingreso = "grey darken-2";
						 	break;
						case "cartaProtesta":
							self.cartap = "grey darken-2";
						 	break;
					} 
					//=============Valid routes=================================//
					if(localStorage.getItem("isAdmin") == null){				//
						window.location = "/#!/login";							//
					}															//
					//==========================================================//

					//metodo para dicernir visualmente si es admin o alumno ===Ed=
					if(localStorage.getItem("isAdmin") == "true"){				//
						self.solicitudToMenu = "Menú principal";
						self.terminar = "Terminar";
						self.carta = false;				                        //	
					}else{	
						self.terminar = "Continuar";							//
						self.solicitudToMenu = "Regresar a solicitudes";		//
						self.carta = true;
					}															//
					//==========================================================//
					
					//=Cambiar la locacion de la pagina en base a si es admin o no Ed=
					self.menuChangue = function(){									//
						if(localStorage.getItem("isAdmin") == "true"){
							//console.log("is admin to #!menu_admin");				//
							window.location = "/#!/admin_principal";
																					//	
						}else{														//
							//console.log("is not admin to #!solicitudes");           //
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

					        	if(localStorage.getItem("isAdmin") == "true"){
									//console.log("is admin to #!menu_admin");				//
									window.location = "/#!/admin_principal";
								}else{														//
									//console.log("is not admin to #!solicitudes");           //
									window.location = "/#!/solicitudes";					//
								}
				            });
						}

					}





				}]
			});