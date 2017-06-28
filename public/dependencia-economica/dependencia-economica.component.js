	angular.
	module('dependenciaEconomica').
		component('dependenciaEconomica',{
			templateUrl: 'dependencia-economica/dependencia-economica.template.html',
			controller: ['$http', function DependenciaEconomicaController($http){
				var self = this;
			
				self.method = "POST"; //Metodo que se mandará a llamar cuando se cargue la página

				self.saveSection = function(){
					self.data =  {
						"solicitudId" : localStorage.getItem("idSolicitud"),
						"escolaridad" : self.escolaridad,
						"tipoTrabajo" : self.tipoTrabajo
					};
					//self.data = JSON.stringify(self.data);
					$http({
						//method: 'POST',
						method: self.method,
						url: 'http://localhost:8000/api/v1.0/deps_econs',
						//data : JSON.stringify(self.data), //FUnciona enviarlo como String también
						data : self.data,  //Pero también funciona enviarlo como simple objeto
						headers : {//Parametro opcional //Si se enviará la data a Node js no es necesario definir un 'Content-Type' pues por default el 'Content-Type' de $http es 'application/json'
							//'Content-Type' : 'application/x-www-form-urlencoded' //codificacion usada por defecto en PHP(con = y &) y en muchos otros servidores, Node js la soporta pero la 'data' se debe enviar en forma: 'matricula='+self.matricula+'&password='+self.password+
		                    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		                    'Content-Type' : 'application/json' //Codificacion por defecto de Angular, y soportada por Node Js(No es soportado directamente por PHP) con esta tipo de contenido se puede enviar 'data' como un objeto o un String de objeto(stringify)
						}
					}).success(function(data){
						//alert(self.data.escolaridad);
						window.location = "#!/ingreso_mensual";
					}).error(function(){
						alert("Error al guardar información");
					});
				}

				self.searchSaved = function(){
					
					$http({
						method: 'GET',
						url: 'http://localhost:8000/api/v1.0/deps_econs/' + localStorage.getItem("idSolicitud")
					}).
					success(function(data){//data es un array que contiene lo que enviamos(Un solo objeto en este caso)
						if(data.length == 0){//Se respondio con un conjunto vacio: data = []
							//No se ha guardado información de esta tabla en la BD
							self.method = 'POST';
						}else{
							self.method = 'PUT';
							self.escolaridad = data[0].escolaridad; //data[0] = objeto regresado por el servidor
							self.tipoTrabajo = data[0].tipoTrabajo;
						}
					}).
					error(function(){
						alert("NOT found");
					});
				}
				self.searchSaved();

				self.regresar = function(){
					window.location = "#!/informacion_hogar";	
				};
			}]
		});
