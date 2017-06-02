angular.
	module('registroForm').
		component('registroForm',{
			templateUrl: 'registro-form/registro-form.template.html',
			controller: ['$http',
				function RegistroFormController($http){
					var self = this;
					self.addUser = function(){
						//alert("Activa funcion addUser");
						$http({
							method: 'POST',
							url: 'http://localhost:8000/api/v1.0/users',
							data: 'matricula='+self.matricula+
								'&password='+self.password+
								'&password2='+self.password2+
								'&nombre='+self.nombre+
								'&apellido1='+self.apellido1+
								'&apellido2='+self.apellido2+
								'&fecha_Nac='+self.fecha_Nac+
								'&carrera='+self.carrera+
								'&semestre='+self.semestre+
								'&grupo='+self.grupo+
								'&sexo='+self.sexo+
								'&idiomaExt='+self.idiomaExt+
								'&estdCivil='+self.estdCivil+
								'&telefono='+self.telefono+
								'&recidencia='+self.recidencia+
								'&calle='+self.calle+
								'&numCalle='+self.numCalle+
								'&colonia='+self.colonia+
								'&municipio='+self.municipio+
								'&estado='+self.estado+
								'&nombreHuesped='+self.nombreHuesped+
								'&parestesco='+self.parestesco,
							headers: {'Content-Type':'application/x-www-form-urlencoded'}

						}).
						success(function(data){
							alert("Registro Realizado Exitosamente.! :)");
						}).
						error(function(){
							alert("Error al registrar Usuario! :'(");
						});
					}
					self.addCancel = function(){
						alert("Registro Cancelado! :'(");
						window.location = "/#!/login";
					}
				}
			]
		});
