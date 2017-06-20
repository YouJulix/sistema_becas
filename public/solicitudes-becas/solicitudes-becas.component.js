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
					self.ver = false;

					self.validar = function(){
						$scope.matricula = localStorage.getItem("matricula");
					


						//console.log(localStorage.getItem("matricula"));

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


					self.estadosCivil = ['Soltero/a','Casado/a','Viudo/a','Divorciado/a'];

					self.estados = ['Oaxaca','Puebla','Guerrero','Chiapas','Veracruz'];
					self.estado1 = self.estados[0];

					self.parentescos = ['Padre','Madre','Abuelos','Tio/a','Primo/a'];


					self.renderFecha = function(fecha){
						self.diaFecha = fecha.substring(0,2);
						self.mesFecha = fecha.substring(3,5);
						self.anyoFecha = fecha.substring(6,10);
					}



					self.imprimirDatos = function(){
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


					$scope.remove = function(idm){	

						//console.log("entro aqui 1");

						confirmar=confirm("Esta seguro que desea eliminar"); 
						if(confirmar){  

					        /*$http({ 
					            method: 'DELETE',
								url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idm
					        }).success(function(data){
					        	console.log("entro aqui 2");
					        	self.imprimir();
					        	//location.reload();
					        	window.location = "/#!/solicitudes";
					        	console.log("entro aqui 3");
					        }).error(function(){
								alert('Error al intentar recuperar el cliente');
							});*/

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
			            	window.location = "/#!/dependencia_economica";
			            }).error(function (data, status, headers, config) {
			                alert('Error al intentar recuperar el cliente');
			            });
			        };


					//Sugerencia... podrian ser la misma funcion
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
									'biblioteca_completa' : true,
									'fecha_envio' : fecha,
									'matricula' : $scope.matricula }
						    }).success(function (data, status, headers, config) {
						localStorage.setItem("idSolicitud",data._id);
						//alert(data._id);
						window.location = "/#!/dependencia_economica";
					    }).error(function (data, status, headers, config) {
						alert('Error al intentar recuperar el cliente');
					    });


					};


					$scope.cerrarSesion = function() {

				  
				        localStorage.clear();
				        window.location = "/#!/login";
				    };



					self.updateUser = function(){
						var expReg = new RegExp("^[a-zA-Z0-9]{0,30}$");
						var expRegText = new RegExp("^[a-zA-Z\\\sáéíóú]{0,40}$");
						var expRegFecha = new RegExp("^[0-3]{1}[0-9]{1}\/[0|1]{1}[0-9]\/[12][09][0-9][0-9]$");
						var expRegTel = new RegExp("^[0-9\\\s]{7,20}$");
						var expRegDom =  new RegExp("^[a-zA-Z\\\sáéíóú0-9]{0,40}$");
						if (!parseInt(self.matricula)){
							alert("Matricula Incorrecta");
						}else if(!(self.matricula.length===10)){
							//$('#inputMAtricula')[0].setCustomValidity("Matricula Incorrecta");
							alert("Matricula Incorrecta");
						}else if (!expReg.test(self.password)){
							alert("Las Contraseñas no debe contener caracteres especiales");	
						}else if (!expReg.test(self.password2)){
							alert("Las Contraseñas no debe contener caracteres especiales");	
						}else if (!(self.password===self.password2)){
							alert("Las Contraseñas no coinciden");	
						}else if (!(expRegText.test(self.nombre))) {
							alert("El campo nombre contiene datos incorrectos");
						}else if (!(expRegText.test(self.apellido1))) {
							alert("El campo de Primer Apellido contiene datos incorrectos");
						}else if (!(expRegText.test(self.apellido2))) {
							alert("El campo de Segundo Apellido contiene datos incorrectos");
						}else if (!(expReg.test(self.idiomaExt))) {
							alert("El campor Idioma datos no permitidos");
						}else if (!(expRegDom.test(self.calle))) {
							alert("El registro Calle contiene valores incorrectos");	
						}else if (!(expRegDom.test(self.numCalle))) {
							alert("El registro Número de Calle contiene valores incorrectos");	
						}else if (!(expRegDom.test(self.colonia))) {
							alert("El registro Colonia contiene valores incorrectos");	
						}else if (!(expRegDom.test(self.municipio))) {
							alert("El registro Municipio contiene valores incorrectos");	
						}else if (!(expRegDom.test(self.nombreHuesped))) {
							alert("El registro Nombre Huesped contiene valores incorrectos");	
						}else{
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
								alert("Actualización Realizada Exitosamente.! :)");
								//window.location="#!/admin_principal";
								self.ver = false;
							}).
							error(function(){
								alert("Error al registrar Usuario! :'(");
							});	
						}
					}



					  


					
				}
			]
		});
