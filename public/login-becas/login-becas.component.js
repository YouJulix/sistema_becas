angular.
	module('loginBecas').
		component('loginBecas', {
			templateUrl: 'login-becas/login-becas.template.html',
			controller: ['$http', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function LoginBecasController($http){
					var self = this; //BUena practica es no manipular el this directamente
					self.dataValid = true; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					self.validateData = function(){
						//alert("Se validarán tus datos: " + self.matricula +", " + self.password);
						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/users/' + self.matricula
						}).success(function(data){
							if(typeof(data) == 'object'){
								if(data == ""){ //Si no se encuentra ningun usuario con ese user
									self.dataValid = false; //Boolean activará mensaje de error en la vista
									self.mensajeError = "Usuario NO registrado";
								}else{ //EL usuario sí está registrado
									$http({
										method: 'GET',
										url: 'http://localhost:8000/api/v1.0/users/' + self.matricula + "/" + self.password //Es necesario ponerle http:// al inicio para que funcione
									}).
									success(function(data){
										//console.log("Julio");
										//console.log(data);
										if(typeof(data) == 'object'){
											if(data == ""){
												self.dataValid = false;
												self.mensajeError = "Contraseña incorrecta";
											}else{
												//self.dataValid = true;
												localStorage.setItem("matricula",data[0].matricula);
												localStorage.setItem("isAdmin", data[0].isAdmin);
												if(data[0].isAdmin == true){
													//Cambiar a otra locacion de los routes //De la Single Page Application
													window.location = "#!/admin_principal";
													//localStorage.setItem("isAdmin", data[0].isAdmin);
												}else{
													window.location = "/#!/solicitudes"; //De la ruta, cambia lo que hay despues de index.html/
												}
											}
										}else{
											alert("Error al intentar recuperar el cliente");
										}
									}).
									error(function(){
										alert('Error al intentar recuperar el cliente');		
									});
								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).
						error(function(){
							alert('Error al intentar recuperar el cliente');
						});
						/*$http.get('http://localhost:8000/api/v1.0/users/' + self.matricula + "/" + self.password).then(function(response){ //the URL is relative to our index.html file
							console.log(response.data);
						})*/
					}				
				}
			]
		});
