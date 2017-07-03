angular.
	module('detallesSolicitudAdmin').
		component('detallesSolicitudAdmin',{
			templateUrl: 'detalles-solicitud-admin/detalles-solicitud-admin.template.html',
			controller: ['$http',
				function RegistroFormController($http){
					var self = this;
					
					self.matricula = localStorage.getItem('matricula');
					self.solicitudId = localStorage.getItem('idSolicitud');
					
					self.closeApp =  function(){
						localStorage.clear();
						window.location = "/#!/login";
					}

					self.calcularFinal = function(porc_sugerido, porc_final){
						if(self.caso_especial){
							return porc_final;
						}else{
							//alert(self.biblioteca_completa);
							//alert(self.libre_de_extra);
							if(self.libre_de_extra || !self.biblioteca_completa){//libre_De_extra, en realidad es un boolean que indica si el alumno ESTÁ en extra
								return (porc_sugerido-25);
							}else{ //Default(NO es caso especial, no está en extra y cumplió con biblio)
								return porc_sugerido;
							}
						}
					}
					self.renderUser = function(){
						$http({
							method:'GET',
							url: 'http://localhost:8000/api/v1.0/users/'+ self.matricula
						}).
						success(function(data){
							//alert(data[0].fechaNac);
							self.matricula = data[0].matricula;
							self.nombre = data[0].nombre;
							self.apellido1 = data[0].apellido1;
							self.apellido2 = data[0].apellido2;
							self.carrera = data[0].carrera;
							self.semestre = data[0].semestre;
							self.grupo = data[0].grupo;

						}).
						error(function(){
							alert("Error. El Usuario no existe");
							window.location = "#!/lista-becas";
						});

						$http({
							method:'GET',
							url: 'http://localhost:8000/api/v1.0/solicitudes/id/'+ self.solicitudId
						}).
						success(function(data){
							//alert(data[0].fechaNac);
							//console.log(data);
							self.estado 			 		= data.estado;
							self.porcentaje_sugerido 		= data.porcentaje_sugerido;
							self.porcentaje_final			= data.porcentaje_final;
							self.libre_de_extra				= data.libre_de_extra;//Esta mal el nombre de la variable, debería ser EN EXTRA
							self.biblioteca_completa		= data.biblioteca_completa;
							self.fecha_envio				= data.fecha_envio;
							self.caso_especial				= data.caso_especial;

							self.porcentaje_final			= self.calcularFinal(self.porcentaje_sugerido, self.porcentaje_final);
							//console.log(self.caso_especial);
							/*if(self.caso_especial){
								//self.porcentaje_final = 
							}else{
								if(!biblioteca_completa){
									self.porcentaje_final
								}
							}*/

						}).
						error(function(){
							alert("Error.");
						});

					};
					self.mandar = function(){
						$('#modalDatosGuardados').modal('close');
						window.location = "/#!/admin_principal";
					}
					self.saveData = function(){
						//alert(self.estado);
						self.data =  {
							"estado" 				:self.estado,
							"porcentaje_sugerido"	:self.porcentaje_sugerido,
							"porcentaje_final"		:self.porcentaje_final,
							"libre_de_extra"		:self.libre_de_extra,	
							"biblioteca_completa"	:self.biblioteca_completa,
							"fecha_envio"			:self.fecha_envio,
							"caso_especial"			:self.caso_especial						
						};
						$http({
							method:'PUT',
							url: 'http://localhost:8000/api/v1.0/solicitudes/id/'+ self.solicitudId,
							data : self.data
						}).
						success(function(data){
							$('#modalDatosGuardados').modal('open');
						//	$('#clicModel').click();
						//	alert("Datos guardados");
						//	window.location = "#!/admin_principal";
						}).
						error(function(){
							alert("Error.");
						});
					};

					self.bibliotecaCambio = function(){
						self.porcentaje_final = self.calcularFinal(self.porcentaje_sugerido, self.porcentaje_final);
						/*if(self.biblioteca_completa){
							self.porcentaje_final = self.porcentaje_sugerido; 
						}
						else{
							self.porcentaje_final = self.porcentaje_sugerido - 25; 
						}
						self.extraCambio();*/
					};

					self.extraCambio = function(){
						self.porcentaje_final = self.calcularFinal(self.porcentaje_sugerido, self.porcentaje_final);
						/*if(self.libre_de_extra){
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
						}*/

					}
					self.casoEspecialCambio = function(){
						if(!self.caso_especial){//Si se deselecciona caso especial, hay que calcular lo anterior
							self.porcentaje_final = self.calcularFinal(self.porcentaje_sugerido, self.porcentaje_final);
						}
					}
					this.renderUser();

					$(document).ready(function(){
						cargarDropdown();
					});
				}
			]
		});
