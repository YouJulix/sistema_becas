angular.
	module('superAdmin').
		component('superAdmin',{
			templateUrl: 'super-admin/super-admin.template.html',
			controller: ['$http', function superAdminController($http){
				var self = this;
				
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
						password: self.password,
						password2: self.password2,
						nombre: self.name
					}

					$http({
						method: 'POST',
						url: 'http://localhost:8000/api/v1.0/users',
						data: self.data
					}).success(function(data){
						window.location.reload();
					}).error(function(){
						alert('Ocurrio un error');
					});
				}

				self.deleteUser = function(username){
					alert("BOrrar a " + username);
					$http({
						method: 'DELETE',
						url: 'http://localhost:8000/api/v1.0/users/' + username,
					}).success(function(data){
						window.location.reload();
					}).error(function(){
						alert('Ocurrio un error al eliminar');
					});
				}

			}]
		});
