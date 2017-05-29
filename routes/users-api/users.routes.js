//API Routers
var express = require('express');

//var addAPIRouter = function(app){ //HACER ESTO NO FUNCIONA (NODE no la reconoce como funcion)
exports.addAPIRouter = function(app, UserCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var users = express.Router();
	users.route('/users')
		.get(UserCtrl.findAllUsers)
		.post(UserCtrl.addUser);
		//Dos puntos(:) antecedidos a una palabra, significa que esta será una variable
	users.route('/users/:matricula') //la variable 'req', trae como 'params' una variable llamada 'matricula'
		.get(UserCtrl.findByMatricula);
	users.route('/users/:matricula/:password') //la variable 'req', trae como 'params' una variable llamada 'matricula' y otra llamada 'password'
		.get(UserCtrl.checkUser);

	app.use("/api/v1.0", users); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}