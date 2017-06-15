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
							//url: 'localhost:8000/api/v1.0/users/' + self.matricula + "/" + self.password //NO Funciona
							url: 'http://localhost:8000/api/v1.0/users/' + self.matricula + "/" + self.password //Es necesario ponerle http:// al inicio para que funcione
						}).success(function(data){
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{
									//self.dataValid = true;
									localStorage.setItem("matricula",data[0].matricula);
									if(data[0].isAdmin){
										//Cambiar a otra locacion de los routes //De la Single Page Application
										window.location = "#!/admin_principal";
										localStorage.setItem("isAdmin", data[0].isAdmin);
									}else{
										window.location = "/#!/solicitudes"; //De la ruta, cambia lo que hay despues de index.html/
									}
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