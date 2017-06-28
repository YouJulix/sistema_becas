angular.
	module('registroForm').
		component('registroForm',{
			templateUrl: 'registro-form/registro-form.template.html',
			controller: ['$http',
				function RegistroFormController($http){
					var self = this;

					self.carreras = ['Lic. en Informática',
									'Ing. en Agronomía',
									'Lic. en Administración'];

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
						self.grupo = "";
					}

					//Modificación Estado Civil
					self.estadosCivil = ['Soltero/a','Casado/a','Otro'];

					//Modificación de Estado
					self.estados = ['Oaxaca'];
					self.estado = 'Oaxaca';

					self.parentescos = ['Padre','Madre','Abuelos','Tio/a','Primo/a'];

					self.dias = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
					self.meses = ['01','02','03','04','05','06','07','08','09','10','11','12'];
					self.anyos = ['1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017',];
					//Cambio en la fecha
					self.valueFecha = function(){
						//alert("s");
						if(self.diaFecha == '29' || self.diaFecha == '30'){
							self.meses = ['01','03','04','05','06','07','08','09','10','11','12'];
						}else if ( self.diaFecha == '31') {
							self.meses = ['01','03','05','07','08','10','12'];
						}else{
							self.meses = ['01','02','03','04','05','06','07','08','09','10','11','12'];
						}
						if(self.mesFecha == '02'){
							self.dias = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];
						}else if (self.mesFecha == '04' || self.mesFecha == '06' || self.mesFecha == '09' || self.mesFecha == '11') {
							self.dias = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
						}else{
							self.dias = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
						}
					}

					//Se Agrega para selección de lengua
					self.lenguas = ['Ninguna','Zapoteco','Mixteco','Mazateco','Mixe','Otra'];
					self.idiomaExt = 'Ninguna';

					self.sexo = "F";
					self.recidencia = "No";

					self.valueFecha();

					self.addUser = function(){
						if (!(self.password == self.password2)){
							alert("Las Contraseñas no coinciden");	
						}else{
							//alert("Consulta");
							$http({
								method:'GET',
								url: 'http://localhost:8000/api/v1.0/users/' + self.matricula
							}).
							success(function(data){
								//alert(data);
								if(data==''){
									$http({
										method: 'POST',
										url: 'http://localhost:8000/api/v1.0/users',
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
											'&estado='+self.estado+
											'&nombreHuesped='+self.nombreHuesped+
											'&parentesco='+self.parentesco+
											'&isAdmin=false',
										headers: {'Content-Type':'application/x-www-form-urlencoded'}

									}).
									success(function(data){
										//alert("Registro Realizado Exitosamente.! :)");
										window.location="#!/notificacion";
									}).
									error(function(){
										alert("Error al registrar Usuario! :'(");
									});
								}else{
									alert("La Matricula ya existe");	
								}
							}).
							error(function(data){
								console.log(data);
							});
						}
					}

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

					self.cancel = function(){
						alert("Registro Cancelado! :'(");
						window.location = "/#!/login";
					}
				}
			]
		});
