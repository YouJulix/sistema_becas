angular.
	module('sistBecasApp').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider){
				$locationProvider.hashPrefix('!');// We also used $locationProvider.hashPrefix() to set the hash-prefix to !. This prefix will appear in the links to our client-side routes, right after the hash (#) symbol and before the actual path (e.g. index.html#!/some/path).
				//Setting a prefix is not necessary, but it is considered a good practice (for reasons that are outside the scope of this tutorial). ! is the most commonly used prefix.
				//Al agregar este prefijo, en nuestros enlaces debemos colocar dicho prefijo: ejemplo:  <a href="#!/phones/{{phone.id}}>..."
				$routeProvider.when('/login',{
					template: function(){
						localStorage.clear();
						return '<login-becas></login-becas>';
					}
				}).
				when('/beca/:section',{
					template:function(url){
						switch(url.section){
							case "gastos_alumno":
								return '<gastos-alumno></gastos-alumno>';
							 	break;
							case "gastos_familiares":
								return '<gastos_familiares></gastos_familiares>';
							 	break;
							case "informacion_hogar":
								return '<informacion-hogar></informacion-hogar>';
							 	break;
							case "dependencia_economica":
								return '<dependencia-economica></dependencia-economica>';
							 	break;
							case "ingreso_mensual":
								return '<modulo-beca2></modulo-beca2>';
							 	break;
							case "cartaProtesta":
								return '<modulo-beca6></modulo-beca6>';
							 	break;
						} 
					}
				}).
				when('/registro',{
					template: '<registro-form></registro-form>'
				}).
				when('/entrada', {
					template: '<h2>Modulo Entrada</h2>'
				}).
				when('/notificacion', {
					template: '<notificacion-registro></notificacion-registro>'
				}).
				when('/edit-user', {
					template: '<edit-admin-info></edit-admin-info>'
				}).
				when('/solicitudes', {
					template: '<solicitudes-becas></solicitudes-becas>'
				}).
				when('/notificbecaenviada', {
					template: '<notificbecaenviada-becas></notificbecaenviada-becas>'
				}).
				when('/detalles_solicitud_admin', {
					template: '<detalles-solicitud-admin></detalles-solicitud-admin>'
				}).
				when('/admin_principal', {
					template: '<admin-search></admin-search>'
				}).
				when('/superadmin',{
					template : '<super-admin></super-admin>'
				}).
				otherwise('/login');
			}
		]);
