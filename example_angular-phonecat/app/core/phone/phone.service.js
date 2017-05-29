//Este será nuestro sericio
//LAS RESPUESTAS DE NUESTRO SERVICIO SON ASINCRONAS, NO SINCRONAS
//this.phones = Phone.query(); //El valor de phones no se obtendra precisamente en el momento de ejecución de la línea, sino hasta que la data haya sido descargada. A la hora de su ejecución toma el valor de un objeto "futuro" y el flujo continua, cuando la data haya sido recibida, la variable 'phone' se actualiza y si está enlazada en un template la vista también se actualiza PROPIEDAD DE ANGULAR! binding!
//Although it looks as if the results were returned synchronously, that is not the case at all. What is returned synchronously is a "future" — an object, which will be filled with data, when the XHR response is received. Because of the data-binding in AngularJS, we can use this future and bind it to our template. Then, when the data arrives, the view will be updated automatically.
angular.
	module('core.phone').
		factory('Phone',['$resource',
			function($resource){
				return $resource('phones/:phoneId.json', {}, { //Nuestra URL tendrá la siguiente estructura(Incluye una variable(:phoneId))
					query:{ //VAr. pro defecto, en esta variable indicaremos los parametros de nuestro query
						method: 'GET',
						params: {phoneId:'phones'}, //Definimos nuestra variable phoneId que irá en nuestra URL,
										//por defecto tendrá el valor 'phones', esto quiere decir que si ejecutamos en nuestro controlador: 
											//self.phones = Phone.query(); //cargará el valor por defecto 'phoneId': 'phones', entregando como resultado el recurso 'phones/phones.json'
										//Si nosotros a diferencia ejecutamos siguiente: 
											//self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone){ //Quiere decir que queremos el metodo get y que establezcamos(cambiamos el valor por defecto de:) phoneId: $routeParams.phoneId
														//self.setImage(phone.images[0]); //COmo NOTA: es bueno poner la funcion ", function(phone){..." detro del .get, porque solo se ejecutará hasta despues que se haya obtenido respuesta de dicho get.//ESTO EVITARÁ QUE SE OPERE(que se ejecute la funcion) "function(phone){..." cuando aun no se ha descargado la data
														//});
						isArray: true //Devolveremos un conjunto de Datos, y no solo uno
					}
				});
			}
			]);