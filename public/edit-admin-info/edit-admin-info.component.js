angular.
	module('editAdminInfo').
		component('editAdminInfo',{
			templateUrl: 'edit-admin-info/edit-admin-info.template.html',
			controller: ['$http',
				function RegistroFormController($http){
					var self = this;

					self.carreras = ['Lic. en Informática','Ing. en Agronomía','Lic. en Administración'];

					self.semestres = ['1°','2°','3°','4°','5°','6°','7°','8°','9°','10°'];

					self.grupos = [];
					self.valueGrupo = function(){
						if(self.carrera == 'Lic. en Informática'){
							if (self.semestre == '1°'){
								self.grupos = ['101-A'];
							}else if (self.semestre == '2°') {
								self.grupos = ['201-A'];
							}else if (self.semestre == '3°'){
								self.grupos = ['301-A'];
							}else if (self.semestre == '4°'){
								self.grupos = ['401-A'];
							}else if (self.semestre == '5°'){
								self.grupos = ['501-A'];
							}else if (self.semestre == '6°'){
								self.grupos = ['601-A'];
							}else if (self.semestre == '7°'){
								self.grupos = ['701-A'];
							}else if (self.semestre == '8°'){
								self.grupos = ['801-A'];
							}else if (self.semestre == '9°'){
								self.grupos = ['901-A'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1001-A'];
							}
						}else if (self.carrera == 'Ing. en Agronomía'){
							if (self.semestre == '1°'){
								self.grupos = ['102-A'];
							}else if (self.semestre == '2°') {
								self.grupos = ['202-A'];
							}else if (self.semestre == '3°'){
								self.grupos = ['302-A'];
							}else if (self.semestre == '4°'){
								self.grupos = ['402-A'];
							}else if (self.semestre == '5°'){
								self.grupos = ['502-A'];
							}else if (self.semestre == '6°'){
								self.grupos = ['602-A'];
							}else if (self.semestre == '7°'){
								self.grupos = ['702-A'];
							}else if (self.semestre == '8°'){
								self.grupos = ['802-A'];
							}else if (self.semestre == '9°'){
								self.grupos = ['902-A'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1002-A'];
							}
						}else if (self.carrera == 'Lic. en Administración') {
							if (self.semestre == '1°'){
								self.grupos = ['103-A','103-B'];
							}else if (self.semestre == '2°') {
								self.grupos = ['203-A','203-B'];
							}else if (self.semestre == '3°'){
								self.grupos = ['303-A','303-B'];
							}else if (self.semestre == '4°'){
								self.grupos = ['403-A','403-B'];
							}else if (self.semestre == '5°'){
								self.grupos = ['503-A','503-B'];
							}else if (self.semestre == '6°'){
								self.grupos = ['603-A','603-B'];
							}else if (self.semestre == '7°'){
								self.grupos = ['703-A','703-B'];
							}else if (self.semestre == '8°'){
								self.grupos = ['803-A','803-B'];
							}else if (self.semestre == '9°'){
								self.grupos = ['903-A','903-B'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1003-A','1003-B'];
							}
						}
					}

					self.estadosCivil = ['Soltero/a','Casado/a','Viudo/a','Divorciado/a'];

					self.estados = ['Oaxaca','Puebla','Guerrero','Chiapas','Veracruz'];
					self.estado = self.estados[0];

					self.parentescos = ['Padre','Madre','Abuelos','Tio/a','Primo/a'];

					self.renderUser = function(matriculaGet){
							$http({
								method:'GET',
								url: 'http://192.168.43.247:8000/api/v1.0/users/'+matriculaGet,
							}).
							success(function(data){
								if (data===""){
								//alert(data[0].fechaNac);
								self.matricula = data[0].matricula;
								self.password = data[0].password;
								self.password2 = data[0].password2;
								self.nombre = data[0].nombre;
								self.apellido1 = data[0].apellido1;
								self.apellido2 = data[0].apellido2;
								self.fechaNac = data[0].fechaNac;
								self.carrera = data[0].carrera;
								self.semestre = data[0].semestre;
								self.grupo = data[0].grupo;
								self.sexo = data[0].sexo;
								self.idiomaExt = data[0].idiomaExt;
								self.edoCivil = data[0].edoCivil;
								self.telefono = data[0].telefono;
								self.recidencia = data[0].recidencia;
								self.calle = data[0].calle;
								self.numCalle = data[0].numCalle;
								self.colonia = data[0].colonia;
								self.municipio = data[0].municipio;
								self.estado = data[0].estado;
								self.nombreHuesped = data[0].nombreHuesped;
								self.parentesco = data[0].parentesco;

								self.valueGrupo();
								//fin if
								}else{
									alert("Error. El Usuario no existe");
									window.location = "#!/lista-becas";	
								}
							}).
							error(function(){
								alert("Error. El Usuario no existe");
								window.location = "#!/lista-becas";
							});
					}

					//Ccarga los datos con la siguiente matricula.
					//Para cargar los datos de determinado alumno, la funcion recibe como parametro la matricula
					//self.renderUser('0113010010');

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
						}else if (!(expRegFecha.test(self.fechaNac))) {
							alert("Formato de Fecha incorrecto");
						}else if (!(expReg.test(self.idiomaExt))) {
							alert("El campor Idioma datos no permitidos");
						}else if (!(expRegTel.test(self.telefono))) {
							alert("El Formato de Telefono es incorrecto");
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
								url: 'http://192.168.43.247:8000/api/v1.0/users/'+self.matricula,
								data: 'matricula='+self.matricula+
									'&password='+self.password+
									'&password2='+self.password2+
									'&nombre='+self.nombre+
									'&apellido1='+self.apellido1+
									'&apellido2='+self.apellido2+
									'&fechaNac='+self.fechaNac+
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
									'&estado='+self.estado+
									'&nombreHuesped='+self.nombreHuesped+
									'&parentesco='+self.parentesco,
								headers: {'Content-Type':'application/x-www-form-urlencoded'}

							}).
							success(function(data){
								alert("Actualización Realizada Exitosamente.! :)");
								window.location="#!/lista-becas";
							}).
							error(function(){
								alert("Error al registrar Usuario! :'(");
							});	
						}
							/*$http({
								method: 'PUT',
								url: 'http://localhost:8000/api/v1.0/users/'+self.matricula,
								data: 'matricula='+self.matricula+
									'&password='+self.password+
									'&password2='+self.password2+
									'&nombre='+self.nombre+
									'&apellido1='+self.apellido1+
									'&apellido2='+self.apellido2+
									'&fechaNac='+self.fechaNac+
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
									'&estado='+self.estado+
									'&nombreHuesped='+self.nombreHuesped+
									'&parentesco='+self.parentesco,
								headers: {'Content-Type':'application/x-www-form-urlencoded'}

							}).
							success(function(data){
								alert("Actualización Realizada Exitosamente.! :)");
								window.location="#!/lista-becas";
							}).
							error(function(){
								alert("Error al registrar Usuario! :'(");
							});*/
					}
					self.cancel = function(){
						alert("Actualización Cancelada! :'(");
						window.location = "/#!/lista-becas";
					}

					self.renderUser(localStorage.getItem("alumno"));
					//self.renderUser("0113010007");
				}
			]
		});
