angular.
	module('moduloBeca2').
		component('moduloBeca2', {
			templateUrl: 'modulo-beca2/modulo-beca2.template.html',
			controller: ['$http',
				function ModuloBeca2Controller($http){
					var self=this;
							
					self.gastoTotal = 0;
					self.solicitudId=localStorage.getItem("idSolicitud");
					

					/**Obtener los datos guardados*/
					self.method="POST";
					object = $http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/ingresoMensual/'+ self.solicitudId
					}).success(function(data){
						object = data[0];
						//console.log(object);
						if(object){
							self.ingresoMenJefe	= parseInt(object.ingresoMenJefe);
							self.ingresoMenGubernamental = parseInt(object.ingresoMenGubernamental);
							self.ingresoMenTerceros = parseInt(object.ingresoMenTerceros);
							self.method="PUT";
						}else{
							self.ingresoMenJefe	= 0;	
							self.ingresoMenGubernamental = 0;	
							self.ingresoMenTerceros = 0;	
						}   
					}).error(function(err){
						console.log(err);
					});
					
					
					self.addIngresoMensual = function(){
						self.data = {
							"solicitudId"	: self.solicitudId,
							"ingresoMenJefe": self.ingresoMenJefe,
							"ingresoMenGubernamental" : self.ingresoMenGubernamental,
							"ingresoMenTerceros"      : self.ingresoMenTerceros
						};
						//console.log(self.method);
						//console.log("val");
					if( (self.ingresoMenGubernamental) > 0 && (self.ingresoMenGubernamental<200) ){
						//console.log("invalido");
						//alert("el rango valido en ingreso gubernamental es 200-10000 o 0");
						//self.modalErrorGubernamental=true;
						$('#modalErrorGubernamental').modal('open');
						return;
					}
					
					if( (self.ingresoMenTerceros > 0) && (self.ingresoMenTerceros<200) ){
						//alert("el rango valido en ingreso de terceros es 200-10000 o 0");
						//self.modalErrorApoyoTer=true;
						$('#modalErrorApoyoTer').modal('open');
						return;
					}
					self.ingresoTotal = parseInt(self.ingresoMenJefe)+parseInt(self.ingresoMenGubernamental)+parseInt(self.ingresoMenTerceros);

					//alert(self.ingresoTotal + self.gastoTotal);
					if(self.ingresoTotal<self.gastoTotal){
						//alert("Verifique que su ingreso mensual es mayor o igual a su gasto mensual");
						$('#modalErrorGastos').modal('open');
						return
					}
						$http({
							
							method: self.method,
							url: 'http://localhost:8000/api/v1.0/ingresoMensual',
							data: self.data
						}).success(function(ingresos){
							if(localStorage.getItem("isAdmin") == "true"){
									self.CambiarIngresoMensual();
							}

							if(localStorage.getItem("isAdmin") == "true"){
								//console.log("isAdmin return to admin_principal");		
								window.location = "/#!/admin_principal";   				
							}else{
								//console.log("is not Admin return to cartaProtesta");
								window.location = "/#!/beca/cartaProtesta";
							}
						}).error(function(error){
							console.log(error);
							alert("Error al agregar ingresos mensuales");
						});




					}



					self.CambiarIngresoMensual = function(){

						//console.log("Entro");
						var suma = self.ingresoMenJefe + self.ingresoMenGubernamental + self.ingresoMenTerceros;
						
						//calcular porcentaje de beca sugerida
						perCapita = ((suma/30) /80.04);
						perCapita = (perCapita * 640.74);

						

						if(perCapita < 2562.97){
							becaSugerida = 100;
						}else if(perCapita < 5125.93){
							becaSugerida = 75;
						}else if(perCapita < 7688.90){
							becaSugerida = 50;
						}else if(perCapita < 10251.86){
							becaSugerida = 25;
						}else if(perCapita > 10251.86 ){
							becaSugerida = 0;
						}

						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + self.solicitudId,

						}).success(function(data){
		
							if(typeof(data) == 'object'){
								
								if(data != ""){
									
										datos = data;
										//console.log(datos);
										matricula = datos.matricula;
										estado = datos.estado;
										porcentaje_sugerido = datos.porcentaje_sugerido;
										porcentaje_final = datos.porcentaje_final;
										libre_de_extra = datos.libre_de_extra;
										biblioteca_completa = datos.biblioteca_completa;
										fecha_envio = datos.fecha_envio;


										if(estado == "terminado"){
											$http({
										        url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + self.solicitudId,
										        method: "PUT",
										        data: { 								
										        	'estado' : estado,
													'porcentaje_sugerido' : becaSugerida,
													'porcentaje_final' : porcentaje_final,
													'libre_de_extra' : libre_de_extra,
													'biblioteca_completa' : biblioteca_completa,
													'fecha_envio' : fecha_envio,
													'matricula' : matricula 
												}
										    }).success(function(data){
										    	//localStorage.removeItem("idSolicitud");
												//window.location = "/#!/notificbecaenviada";
									        }).error(function(){
												//alert('! ERROR No se envio la solicitud!');
											});
										}

								}
							}else{
								alert('! ERROR La solicitud esta vacía!');
							}

						}).error(function(){
							alert('! ERROR No se encontro la solicitud en la base de datos !');
						});

					}

					//Funcion Para calcular los gastos que determinan el ingreso mensual
					self.calculaGastos = function(){
						$http({
							method 	: 	'GET',
							url 	: 	'http://localhost:8000/api/v1.0/gastos_familiares/'+ self.solicitudId
						}).success(function(data){
							object = data[0];
							self.gastoTotal = parseInt(object.agua) + parseInt(object.luz) + 
												parseInt(object.telefono) + parseInt(object.gas) + 
												parseInt(object.educacion) + parseInt(object.transporte) +
												parseInt(object.rentadomicilio) + parseInt(object.television) +
												parseInt(object.internet) + parseInt(object.alimentacion) + 
												parseInt(object.vestido) + parseInt(object.medico) + 
												parseInt(object.diversion) + parseInt(object.otro);
						}).error(function(err){
							console.log(err);
						});
					}

					self.calculaGastos();					
				}
			]
		});

