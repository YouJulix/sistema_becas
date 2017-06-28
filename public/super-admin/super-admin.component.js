angular.
	module('superAdmin').
		component('superAdmin',{
			templateUrl: 'super-admin/super-admin.template.html',
			controller: ['$http', function superAdminController($http){
				var self = this;
				//self.isEval = true;
				$http({
					method 	: 	'GET',
					url 	: 	'http://localhost:8000/api/v1.0//users'
				}).success(function(data){self.users = data}).error(function(err){console.log(err)});
				
				$(document).ready(function(){
					$('.collapsible').collapsible();
					$('.modal').modal();
				});

				self.addUser = function(){
					self.data = {
						matricula: self.username,
						password2: self.password,
						nombre: self.name,
						apellido1: self.apellido1,
						apellido2: self.apellido2,
						isAdmin	: self.isEval
					}
					
					$http({
						method: 'POST',
						url: 'http://localhost:8000/api/v1.0/users',
						data: self.data
					}).success(function(data){
						alert("Usuario agregado exitosamente!");
						window.location.reload();
					}).error(function(){
						alert('Ocurrio un error');
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
							window.location.reload();
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
						window.location.reload();
					}).error(function(){
						alert("Error, no se puede actualizar el usuario");
					});
				}

				self.refreshPage = function(){					
					window.location.reload();
				}

			}]
		});
