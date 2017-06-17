angular.
	module('gastosAlumno').
		component('gastosAlumno',{
			templateUrl: 'gastos-alumno/gastos-alumno.template.html',
			controller: ['$http',
				function gastosAlumnoController($http){
					var self = this;
					
					//self.solicitud = 5000; //Pruebas de desarrollo solicitud == 1 <-- Recuperar del local storage
 					self.solicitud = localStorage.getItem("idSolicitud");
 					$http({
						method 	: 	'GET',
						url 	: 	'http://192.168.43.247:8000/api/v1.0/gastos/'+ self.solicitud
					}).success(function(data){
						object = data[0];
						console.log(object);
						if(object){
							self.method = "PUT";
							self.gastosMedicos	= parseInt(object.gastosMedicos);
							self.rentaSi 		= object.isRenta.renta;
							self.montoRenta 	= parseInt(object.isRenta.monto);
							//
							self.taxi = object.transporteMetodo.taxi;
							self.vehiculo = object.transporteMetodo.vehiculo;
							self.caminar = object.transporteMetodo.caminar;
							self.bicicleta = object.transporteMetodo.bicicleta;
							//Retornadas a false por comodidad 
						}else{
							self.method = "POST";
							self.taxi = false;
							self.vehiculo = false;
							self.caminar = false;
							self.bicicleta = false;
							self.montoRenta = 0;
							self.gastosMedicos = 0;
						}   
					}).error(function(err){
						console.log(err);
					});
					
					
					//Funcion para guardadr solicitud... 
					self.saveData = function(){
						
						if(self.gastosMedicos < 0){
 							alert("Solo numeros positivos");
 							return;
 						}
 						if(self.gastosMedicos > 15000){
 							alert("La cantidad es demaciado alta, comunicarse con el administrador");
 							return;
 						}
						if(self.montoRenta < 0 ){
							alert("El monto de la renta es incorrecto solo numeros positivos");
							return;
						}

						if(self.montoRenta > 10000){
							alert("El monto de la renta es demaciado alto, comunicarse con el administrador");
							return;
						}
						
						if( !self.taxi && !self.caminar &&  !self.bicicleta && !self.vehiculo){
							alert("Elija minimo un metodo de transporte");
							return;
						}

						if(self.isRenta){
							if(self.montoRenta == 0){
								alert("Los gastos de renta mensual deben ser mayor a 0");
								return;
							}
						}
						//Construir un objeto
						self.data = {
							"becaSolicitud" 	: 	self.solicitud,
							"gastosMedicos"		: 	self.gastosMedicos,
							"isRenta"			: 	{
														"renta"	: self.rentaSi,
														"monto"	: self.montoRenta  
													},	
							"transporteMetodo"	: 	{
														"taxi"		:self.taxi,
														"vehiculo"	:self.vehiculo,
														"caminar"	:self.caminar,
														"bicicleta"	:self.bicicleta	
													}
						};

						$http({
							method	: self.method,
							url 	: 'http://192.168.43.247:8000/api/v1.0/gastos',
							data 	: self.data
						}).success(function(gastos){
							if(typeof(gastos) == "object"){
								console.log(gastos);
								window.location = "/#!/informacion_hogar";
							}
						}).error(function(err){
							console.log(err);
						});
					}

				}
			]
		});
