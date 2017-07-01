angular.
	module('solicitudesBecas').
		component('solicitudesBecas', {
			templateUrl: 'solicitudes-becas/solicitudes-becas.template.html',

			controller: ['$http', '$scope',//Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function SolicitudesBecasController($http,$scope){

					$scope.datos = {}; //declarar arreglo de arreglos

					$scope.pendientes = [];
					$scope.terminados = [];

					$scope.becaAsignada = 0;


					//$scope.valor = 5; //ejemplo para declarar variables

					var self = this; //BUena practica es no manipular el this directamente
					//self.matricula = '12345'; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					
					//localStorage.setItem("matricula","12345");

					self.password_Actual = "";
					self.password_Nueva = "";
					self.password_Repetir = "";

					self.validar = function(){
						$scope.matricula = localStorage.getItem("matricula");
						if($scope.matricula == null){
							window.location = "/#!/login";
						}
					};

					self.validar();


					
					self.imprimir = function(){
						$scope.datos = {};
						
						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/solicitudes/'+$scope.matricula

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									//self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{

										$scope.datos = data;

										$scope.pendientes = [];
										$scope.terminados = [];

										
										//guardar las solicitudes pendientes en un arreglo
										angular.forEach($scope.datos, function(solicitudes){

											

											if(solicitudes.estado == 'pendiente'){
												$scope.pendientes.push(solicitudes);
												document.getElementById("ocultar").disabled = true;
											}

											
											if(solicitudes.estado == 'terminado'){
												$scope.terminados.push(solicitudes);
											}

											
										});


			

										if($scope.terminados.length != 0){
											$scope.becaAsignada = $scope.terminados[$scope.terminados.length-1].porcentaje_final;
										}

										

								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).error(function(){
							alert('Error al intentar recuperar el cliente');
						});

					};

					self.imprimir();


					//Modificación Estado Civil
					self.estadosCivil = ['Soltero/a','Casado/a','Otro'];

					//Modificación de Estado
					self.estados = ['Oaxaca'];
					self.estado1 = 'Oaxaca';

					self.parentescos = ['Padre','Madre','Abuelos','Tio/a','Primo/a'];


					self.renderFecha = function(fecha){
						self.diaFecha = fecha.substring(0,2);
						self.mesFecha = fecha.substring(3,5);
						self.anyoFecha = fecha.substring(6,10);
					}

					//Se Agrega para selección de lengua
					self.lenguas = ['Ninguna','Zapoteco','Mixteco','Mazateco','Mixe','Otra'];
					self.idiomaExt = 'Ninguna';



					self.imprimirDatos = function(){
						localStorage.setItem('alumno',$scope.matricula);
						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/users/' + $scope.matricula

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									//self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{
									//alert(data[0].matricula);

									$scope.dato = data;

									if((data[0].isNewU)){
										window.location = "/#!/edit-user";	
									}
							
								
									self.matricula = data[0].matricula;
									self.password = data[0].password;
									self.password2 = data[0].password2;
									self.nombre = data[0].nombre;
									self.apellido1 = data[0].apellido1;
									self.apellido2 = data[0].apellido2;
									self.carrera = data[0].carrera;
									self.semestre = data[0].semestre;
									self.grupo = data[0].grupo;
									self.sexo = data[0].sexo;
									//alert(data[0].sexo);
									//self.idiomaExt = data[0].idiomaExt;
									self.edoCivil = data[0].edoCivil;
									//self.telefono = data[0].telefono;
									self.recidencia = data[0].recidencia;
									self.calle = data[0].calle;
									self.numCalle = data[0].numCalle;
									//self.colonia = data[0].colonia;
									self.municipio = data[0].municipio;
									self.estado1 = data[0].estado;
									//self.nombreHuesped = data[0].nombreHuesped;
									self.parentesco = data[0].parentesco;

									self.renderFecha(data[0].fechaNac);

									self.viewRecidencia();
									if(data[0].telefono == 'undefined'){
										self.telefono == " ";
									}else{
										self.telefono = data[0].telefono;
									}
									if(data[0].idiomaExt == 'undefined'){
										self.idiomaExt == " ";
									}else{
										self.idiomaExt = data[0].idiomaExt;
									}
									if(data[0].colonia == 'undefined'){
										self.colonia == " ";
									}else{
										self.colonia = data[0].colonia;
									}
									if(data[0].nombreHuesped == 'undefined'){
										self.nombreHuesped == " ";
									}else{
										self.nombreHuesped = data[0].nombreHuesped;
									}
									
								}
							}else{
								window.location = "/#!/login";
							}
						}).error(function(){
							window.location = "/#!/login";
						});
					}

					self.imprimirDatos();

					//Esconder Otros datos
					self.viewRecidencia = function(){
						if(self.recidencia == 'Si'){
							self.viewRecid = {"display":"block"}
						}else{
							self.viewRecid = {"display":"none"}
							self.nombreHuesped = "";
							self.parentesco = "";
						}
					}
					self.viewRecidencia();


					$scope.remove = function(idm){	

						confirmar=confirm("Esta seguro que desea eliminar"); 
						if(confirmar){  

				            $http['delete']('http://localhost:8000/api/v1.0/solicitudes/id/' + idm).success(function() {
				              	//self.imprimir();
					        	//location.reload();
					        	window.location = "/#!/solicitudes";
				              	//console.log("ya");
				              	location.reload();
				              	//location.reload();
				            });
						}

					};


					$scope.modificar = function(id){
						localStorage.setItem("idSolicitud",id);
						window.location = "/#!/dependencia_economica";


					};

					$scope.agregar = function(id){
						var f = new Date();
						var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
						

					    $http({
					        url: 'http://localhost:8000/api/v1.0/solicitudes/',
					        method: "POST",
					        data: { 								
					        	'estado' : "pendiente",
								'porcentaje_sugerido' : 0,
								'porcentaje_final' : 0,
								'libre_de_extra' : false,
								'biblioteca_completa' : false,
								'fecha_envio' : fecha,
								'matricula' : $scope.matricula }
					    }).success(function (data, status, headers, config) {
			                localStorage.setItem("idSolicitud",data._id);
			            	//alert(data._id);
			            	window.location = "/#!/beca/gastos_alumno";
			            }).error(function (data, status, headers, config) {
			                alert('Error al intentar recuperar el cliente');
			            });
			        };


					//Sugerencia... podrian ser la misma funcion
					$scope.modificar = function(id){
						localStorage.setItem("idSolicitud",id);
						window.location = "/#!/beca/gastos_alumno";


					};



					$scope.cerrarSesion = function() {
				        localStorage.clear();
				        window.location = "/#!/login";
				    };



					/*self.updateUser = function(){

							//si cambia contraseña
							if(self.cambiar_contrasenia == true){
								//console.log(self.cambiar_contrasenia);
								//console.log(self.password_Actual);
								//console.log(self.password_Nueva);
								//console.log(self.password_Repetir);
								if(self.password_Actual == "" || self.password_Nueva == "" || self.password_Repetir== ""){
									alert("! Falta agregar campo contraseña !");
								}else{

									//verificar la contraseña actual con la guardada en la base de datos
									if(self.password_Actual == self.password){

										//comparar contraseña nueva con la  repetir contraseña
										if(self.password_Nueva == self.password_Repetir){
											self.password = self.password_Nueva;
											self.password2 = self.password_Repetir;
											self.cancel();
											self.modificarUsuario();
										}else{
											alert("La contraseña Nueva y la contraseña repetir no coinciden");
										}

									}else{
										alert("Contraseña Incorrecta Vuelva a Intentarlo");
									}
									
								}
							}else{

								self.modificarUsuario();
				
							}
					}*/



					self.modificarUsuario = function(){

						$http({
							method: 'PUT',
							url: 'http://localhost:8000/api/v1.0/users/'+self.matricula,
							data: 'matricula='+self.matricula+
								'&password='+self.password+
								'&password2='+self.password2+
								'&nombre='+self.nombre+
								'&apellido1='+self.apellido1+
								'&apellido2='+self.apellido2+
								'&fechaNac='+self.diaFecha+"/"+self.mesFecha+"/"+self.anyoFecha+
								'&carrera='+self.carrera+
								'&semestre='+self.semestre+
								'&grupo='+self.grupo+
								'&sexo='+self.sexo+
								'&idiomaExt='+self.idiomaExt+
								'&edoCivil='+self.edoCivil+
								'&telefono='+self.telefono+
								'&recidencia='+self.recidencia+
								'&calle='+self.calle+
								'&numCalle='+self.numCalle+
								'&colonia='+self.colonia+
								'&municipio='+self.municipio+
								'&estado='+self.estado1+
								'&nombreHuesped='+self.nombreHuesped+
								'&parentesco='+self.parentesco,
							headers: {'Content-Type':'application/x-www-form-urlencoded'}

						}).
						success(function(data){
							//alert("Actualización Realizada Exitosamente.! :)");
							//window.location="#!/admin_principal";
						}).
						error(function(){
							alert("Error al registrar Usuario! :'(");
						});


					}


					self.cancel = function(){
						
						self.password_Actual = "";
						self.password_Nueva = "";
						self.password_Repetir = "";

						$('#modalCambiarContra').modal('close')

					}	

					self.limpiarCampos = function(){
						self.password_Actual = "";
						self.password_Nueva = "";
						self.password_Repetir = "";
						self.verCampo = !self.verCampo;
					}


					self.modalCambiarContra = function(){

						//verificar la contraseña actual con la guardada en la base de datos
						if(self.password_Actual == self.password){

							//comparar contraseña nueva con la  repetir contraseña
							if(self.password_Nueva == self.password_Repetir){
								self.password = self.password_Nueva;
								self.password2 = self.password_Repetir;
							
								self.modificarUsuario();
								 $('#modalCambiarContra').modal('close');
								 $('#cambiarContraBien').modal('open'); 
								 self.limpiarCampos();
							}else{
								//alert("La contraseña Nueva y la contraseña repetir no coinciden");
								
								$('#repetircontraseniaInco').modal('open'); 
							}

						}else{
							$('#contraseniaInco').modal('open');
						}

					}



					self.modalCambiarDatos = function(){

						self.modificarUsuario();
						$('#modalCambiarDatos').modal('close');
						$('#cambiarContraBien').modal('open');
					}



					
				}
			]
		});
