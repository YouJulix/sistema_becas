//API Routers
var express = require('express');

//var addAPIRouter = function(app){ //HACER ESTO NO FUNCIONA (NODE no la reconoce como funcion)
exports.addAPIRouter = function(app, UserCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var solicitudes = express.Router();
	solicitudes.route('/solicitudes/:matricula')
		.get(UserCtrl.findByMatricula);	
	solicitudes.route('/solicitudes')
		.get(UserCtrl.findAllSolicitudes)
		.post(UserCtrl.addSolicitudes);
	solicitudes.route('/solicitudes/id/:_id')
		.get(UserCtrl.findById)
		.put(UserCtrl.updateSolicitudes)
		.delete(UserCtrl.deleteSolicitudes);	

		//Dos puntos(:) antecedidos a una palabra, significa que esta será una variable
	//solicitudes.route('/users/:matricula') //la variable 'req', trae como 'params' una variable llamada 'matricula'
	//	.get(UserCtrl.findByMatricula);


	app.use("/api/v1.0", solicitudes); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}