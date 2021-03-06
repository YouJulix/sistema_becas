angular.
	module('detallesSolicitudAdmin').
		component('detallesSolicitudAdmin',{
			templateUrl: 'detalles-solicitud-admin/detalles-solicitud-admin.template.html',
			controller: ['$http',
				function RegistroFormController($http){
					var self = this;
					/*
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
					*/

					self.matricula = localStorage.getItem('matricula');
					self.solicitudId = localStorage.getItem('idsolicitud');
					
					self.renderUser = function(){
						$http({
							method:'GET',
							url: 'http://localhost:8000/api/v1.0/users/'+ self.matricula
						}).
						success(function(data){
							//alert(data[0].fechaNac);
							self.matricula = data[0].matricula;
							self.password = data[0].password;
							self.password2 = data[0].password2;
							self.nombre = data[0].nombre;
							self.apellido1 = data[0].apellido1;
							self.apellido2 = data[0].apellido2;
							self.fechaNac = data[0].fechaNac;
							self.carrera = data[0].carrera;
							self.semestre = data[0].semestre;
							self.grupo = data[0].grupo;
							self.sexo = data[0].sexo;
							self.idiomaExt = data[0].idiomaExt;
							self.edoCivil = data[0].edoCivil;
							self.telefono = data[0].telefono;
							self.recidencia = data[0].recidencia;
							self.calle = data[0].calle;
							self.numCalle = data[0].numCalle;
							self.colonia = data[0].colonia;
							self.municipio = data[0].municipio;
							self.estado = data[0].estado;
							self.nombreHuesped = data[0].nombreHuesped;
							self.parentesco = data[0].parentesco;

						}).
						error(function(){
							alert("Error. El Usuario no existe");
							window.location = "#!/lista-becas";
						});
/*
{
"matricula": "0113010003",
"estado": "completa",
"porcentaje_sugerido": "100",
"porcentaje_final": "100",
"libre_de_extra": "true",
"biblioteca_completa": "true",
"fecha_envio": "15/06/2017"
}
*/
						$http({
							method:'GET',
							url: 'http://localhost:8000/api/v1.0/solicitudes/'+ self.matricula
						}).
						success(function(data){
							//alert(data[0].fechaNac);
							self.estado 			 		= data[0].estado;
							self.porcentaje_sugerido 		= data[0].porcentaje_sugerido;
							self.porcentaje_final			= data[0].porcentaje_final;
							self.libre_de_extra				= data[0].libre_de_extra;
							self.biblioteca_completa		= data[0].biblioteca_completa;
							self.fecha_envio				= data[0].fecha_envio;
						}).
						error(function(){
							alert("Error.");
						});

					};
					self.saveData = function(){
						self.data =  {
							"estado" 				: self.estado,
							"porcentaje_sugerido"	:self.porcentaje_sugerido,
							"porcentaje_final"		:self.porcentaje_final,
							"libre_de_extra"		:self.libre_de_extra,	
							"biblioteca_completa"	:self.biblioteca_completa,
							"fecha_envio"			:self.fecha_envio						
						};
						$http({
							method:'PUT',
							url: 'http://localhost:8000/api/v1.0/solicitudes/id/'+ self.solicitudId,
							data : self.data
						}).
						success(function(data){
							alert("Datos guardados");
							window.location = "#!/login";
						}).
						error(function(){
							alert("Error.");
						});
					};

					self.bibliotecaCambio = function(){
						if(self.biblioteca_completa){
							self.porcentaje_final = self.porcentaje_sugerido; 
						}
						else{
							self.porcentaje_final = self.porcentaje_sugerido - 25; 
						}
						self.extraCambio();
					};

					self.extraCambio = function(){
						if(self.libre_de_extra){
							if(self.biblioteca_completa){
								self.porcentaje_final = self.porcentaje_sugerido - 25; 
							}
							else{
								self.porcentaje_final = self.porcentaje_final; 
							}	
						}
						else{
							if(self.biblioteca_completa){
								self.porcentaje_final = self.porcentaje_sugerido; 
							}
							else{
								self.porcentaje_final = self.porcentaje_final; 
							}	
						}

					}

					this.renderUser(self.matricula);
				}
			]
		});
