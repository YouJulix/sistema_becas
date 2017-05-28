angular.
	module('loginBecas').
		component('loginBecas', {
			templateUrl: 'login-becas/login-becas.template.html',
			controller: function LoginBecasController(){
				var self = this;
				self.dataValid = false; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
				self.validateData = function(){
					alert("Se validarán tus datos: " + self.matricula +", " + self.password);
					self.dataValid = true;
				}				
			}
		});

