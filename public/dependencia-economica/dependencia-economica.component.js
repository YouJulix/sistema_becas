angular.
	module('dependenciaEconomica').
		component('dependenciaEconomica',{
			templateUrl: 'dependencia-economica/dependencia-economica.template.html',
			controller: ['$http', function DependenciaEconomicaController($http){
				var self = this;

				self.saveSection = function(){
					
					//self.data = JSON.stringify(self.data);
					self.data =  {
						"solicitudId" : localStorage.getItem("idSolicitud"),
						"escolaridad" : self.escolaridad,
						"tipoTrabajo" : self.tipoTrabajo
					};

					$http({
						method: 'POST',
						url: 'http://localhost:8000/api/v1.0/deps_econs',
						//data : JSON.stringify(self.data), //FUnciona enviarlo como String también
						data : self.data,  //Pero también funciona enviarlo como simple objeto
						headers : {//Parametro opcional //Si se enviará la data a Node js no es necesario definir un 'Content-Type' pues por default el 'Content-Type' de $http es 'application/json'
							//'Content-Type' : 'application/x-www-form-urlencoded' //codificacion usada por defecto en PHP(con = y &) y en muchos otros servidores, Node js la soporta pero la 'data' se debe enviar en forma: 'matricula='+self.matricula+'&password='+self.password+
		                    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		                    'Content-Type' : 'application/json' //Codificacion por defecto de Angular, y soportada por Node Js(No es soportado directamente por PHP) con esta tipo de contenido se puede enviar 'data' como un objeto o un String de objeto(stringify)
						}
					}).success(function(data){
						window.location = "#!/ingreso_mensual";
					}).error(function(){
						alert("Error al guardar información");
					});
				}
			}]
		});