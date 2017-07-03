angular.
	module('superAdmin').
		component('superAdmin',{
			templateUrl: 'super-admin/super-admin.template.html',
			controller: ['$http', function superAdminController($http){
				var self = this;
				//self.isEval = true;
				if(localStorage.getItem("super")){
					//no hagas nada
				}else{
					window.location = "/#!/login";
				}
				self.leerUsuarios = function(){
					$http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0//users'
					}).success(function(data){
						self.users = data
					}).error(function(err){
						console.log(err)
					});	
				}
				
				self.leerUsuarios();

				$(document).ready(function(){
					$('.collapsible').collapsible();
					$('.modal').modal();
				});

				self.close = function(){
					localStorage.clear();
					window.location.reload();
				}
				self.limpiarFormAddUser = function(){
					self.role = "Evaluador";
					self.name = "";
					self.apellido1 = "";
					self.apellido2 = "";
					self.username = "";
					self.password = "";
				}

				self.addUser = function(){
					if(self.role == "Estudiante"){
						self.isEval = false;
					}
					if(self.role == "Evaluador"){
						self.isEval = true;
					}
					self.data = {
						matricula: self.username,
						nombre: self.name,
						apellido1: self.apellido1,
						apellido2: self.apellido2,
						password: self.password,
						password2: self.password,
						isAdmin	: self.isEval,
						isNewU : true

					}
					console.log(self.data);
					$http({
						method: 'POST',
						url: 'http://localhost:8000/api/v1.0/users',
						data: self.data
					}).success(function(data){
						$('.modal').modal('close');
						alert("Usuario agregado exitosamente!");
						//window.location.reload();
						self.leerUsuarios();//Se ejecuta de manera asincrona, de todas maneras se dibujará cuando se descargue todo, gracias al two-binding de ANgular
						self.limpiarFormAddUser();												
					}).error(function(){
						alert('Ocurrio un error, porfavor intente otra vez');
					});
				}

				self.deleteUser = function(username){
					var r = confirm("¿Seguro que deseas borrar al usuario "+ username + "?");
					if( r == true){
						$http({
							method: 'DELETE',
							url: 'http://localhost:8000/api/v1.0/users/' + username,
						}).success(function(data){
							alert("Usuario eliminado exitosamente!");
							//window.location.reload();
							self.leerUsuarios();
						}).error(function(){
							alert('Ocurrio un error al eliminar');
						});
					}
				}
				self.updateUser = function(user){
					console.log(user);
					self.data = {
						//matricula: user.matricula,
						nombre: user.nombre,
						apellido1: user.apellido1,
						apellido2: user.apellido2,
						password: user.password,
						password2: user.password
					}
					console.log("data");
					console.log(self.data);

					$http({
						method: 'PUT',
						url: 'http://localhost:8000/api/v1.0/users/' + user.matricula,
						data: self.data
					}).success(function(user){
						alert("Usuario actualizado exitosamente");
						//window.location.reload();
						self.leerUsuarios();
					}).error(function(){
						alert("Error, no se puede actualizar el usuario");
					});
				}

				self.refreshPage = function(){					
					window.location.reload();
				}

			}]
		});
