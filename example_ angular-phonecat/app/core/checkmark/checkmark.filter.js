angular.
	module('core').
		filter('checkmark', function(){
			return function(input){
				return input ? '\u2713' : '\u2718';
			};
		})

		//The syntax for using filters in AngularJS templates is as follows:
			//{{expression | filter}}