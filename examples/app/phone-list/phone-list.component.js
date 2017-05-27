angular.module('phoneList').
	component('phoneList',{ //the name of the component is in camelCase
		/*template:
			'<ul>' +
				'<li ng-repeat="phone in $ctrl.phones">' + //BY default components use $ctrl as the controller allias//a good practice to avoid using the scope directly. 
					'<span>{{phone.name}}</span>'+
					'<p>{{phone.snippet}}</p>' +
				'</li>' +
			'</ul>',*/
		templateUrl: 'phone-list/phone-list.template.html',
		//controller: ['$http', //SI no agregamos la inyeccion como String(sunque despues la pasamos como parametro, y minificamos el archivo, Angular) no detectará el servicio $http, We can overcome this problem by annotating the function with the names of the dependencies, provided as strings, which will not get minified.
		controller: ['Phone', //Servicio creado por mi en la carpeta core
		 function PhoneListController(Phone){
			var self = this;
			self.orderProp = 'age';
			self.phones = Phone.query();
			/*$http.get('phones/phones.json').then(function(response){ //the URL is relative to our index.html file
				self.phones = response.data;
				//self.phones = response.data.slice(0, 5); //MOstrar solo 5 elementos //The slice() method returns the selected elements in an array, as a new array object.//The slice() method selects the elements starting at the given start argument, and ends at, but does not include, the given end argument.
			})*/
		}
		]
		/*
		controller: function phoneListController(){
			this.phones = [
				{
					name: 'Nexus S',
					snippet: 'Fast just got faster with Nexus S.',
					age : 1
				}, {
					name: 'Motorola XOOM™ with Wi-Fi',
					snippet: 'XThe Next, Next Generation tablet.',
					age : 2
				}, {
					name: 'MOTOROLA XOOM™',
					snippet: 'The Next, Next Generation tablet.',
					age : 3
				}
			];

			this.orderProp = 'age';
		}*/
	});