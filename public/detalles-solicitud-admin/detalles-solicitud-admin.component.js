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

					self.carreras = ['Lic. en Informática',
									'Ing. en Agronomía',
									'Lic. en Administración'];

					self.semestres = ['1°','2°','3°','4°','5°','6°','7°','8°','9°','10°'];

					self.grupos = [];
					self.valueGrupo = function(){
						if(self.carrera == 'Lic. en Informática'){
							if (self.semestre == '1°'){
								self.grupos = ['101-A'];
							}else if (self.semestre == '2°') {
								self.grupos = ['201-A'];
							}else if (self.semestre == '3°'){
								self.grupos = ['301-A'];
							}else if (self.semestre == '4°'){
								self.grupos = ['401-A'];
							}else if (self.semestre == '5°'){
								self.grupos = ['501-A'];
							}else if (self.semestre == '6°'){
								self.grupos = ['601-A'];
							}else if (self.semestre == '7°'){
								self.grupos = ['701-A'];
							}else if (self.semestre == '8°'){
								self.grupos = ['801-A'];
							}else if (self.semestre == '9°'){
								self.grupos = ['901-A'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1001-A'];
							}
						}else if (self.carrera == 'Ing. en Agronomía'){
							if (self.semestre == '1°'){
								self.grupos = ['102-A'];
							}else if (self.semestre == '2°') {
								self.grupos = ['202-A'];
							}else if (self.semestre == '3°'){
								self.grupos = ['302-A'];
							}else if (self.semestre == '4°'){
								self.grupos = ['402-A'];
							}else if (self.semestre == '5°'){
								self.grupos = ['502-A'];
							}else if (self.semestre == '6°'){
								self.grupos = ['602-A'];
							}else if (self.semestre == '7°'){
								self.grupos = ['702-A'];
							}else if (self.semestre == '8°'){
								self.grupos = ['802-A'];
							}else if (self.semestre == '9°'){
								self.grupos = ['902-A'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1002-A'];
							}
						}else if (self.carrera == 'Lic. en Administración') {
							if (self.semestre == '1°'){
								self.grupos = ['103-A','103-B'];
							}else if (self.semestre == '2°') {
								self.grupos = ['203-A','203-B'];
							}else if (self.semestre == '3°'){
								self.grupos = ['303-A','303-B'];
							}else if (self.semestre == '4°'){
								self.grupos = ['403-A','403-B'];
							}else if (self.semestre == '5°'){
								self.grupos = ['503-A','503-B'];
							}else if (self.semestre == '6°'){
								self.grupos = ['603-A','603-B'];
							}else if (self.semestre == '7°'){
								self.grupos = ['703-A','703-B'];
							}else if (self.semestre == '8°'){
								self.grupos = ['803-A','803-B'];
							}else if (self.semestre == '9°'){
								self.grupos = ['903-A','903-B'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1003-A','1003-B'];
							}
						}
					}

					self.estadosCivil = ['Soltero/a','Casado/a','Viudo/a','Divorciado/a'];

					self.estados = ['Oaxaca','Puebla','Guerrero','Chiapas','Veracruz'];
					self.estado = self.estados[0];

					self.parentescos = ['Padre','Madre','Abuelos','Tio/a','Primo/a'];
					
					self.matricula = localStorage.getItem('matricula');
					self.solicitudId = localStorage.getItem('idSolicitud');
					
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

							self.valueGrupo();
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
					}
					this.renderUser(self.matricula);
				}
			]
		});
