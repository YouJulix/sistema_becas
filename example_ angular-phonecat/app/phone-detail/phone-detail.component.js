angular.
	module('phoneDetail').
		component('phoneDetail', { //Se instancia por cada vez que se llama en el route
			//template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>', //the phoneId model is visible only in the context set by the phoneDetail component. Again, component isolation at work!
			templateUrl: 'phone-detail/phone-detail.template.html', //the URL is relative to our index.html file
			//controller: ['$http', '$routeParams', //Tener CUIDADO sino se agrega el '$' no funciona, $routeParams = nombre de un Provider
			//REMPLAZAMOS EL SERVICIO $http de Angular, por el que creamos nosotros
			controller: ['$routeParams', 'Phone', //Cargamos SERVICIOS //Tener CUIDADO sino se agrega el '$' no funciona, $routeParams = nombre de un Provider
				//function PhoneDetailController($http, $routeParams){
					function PhoneDetailController($routeParams, Phone){
					//this.phoneId = $routeParams.phoneId; 
					var self = this;

					self.setImage = function setImage(imageUrl){
						self.mainImageUrl = imageUrl;
					};
					
					/*$http.get('phones/' + $routeParams.phoneId + '.json').then( function(response){
						self.phone = response.data;
						self.setImage(self.phone.images[0]);
					})*/
					self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone){ //Para este caso se Incluye una callback function (esta: ,."function(phone){...}"), COmo NOTA: es bueno poner la funcion ", function(phone){..." detro del .get, porque solo se ejecutará hasta despues que se haya obtenido respuesta de dicho get. //ESTO EVITARÁ QUE SE OPERE(que se ejecute la funcion) "function(phone){..." cuando aun no se ha descargado la data
						self.setImage(phone.images[0]);
					});
					//12. BEGIN Experiments
					/*self.onDblclick = function onDblclick(imageUrl) {
					  alert('You double-clicked image: ' + imageUrl);
					};*/
					//END Experiment
				}
			]
		});