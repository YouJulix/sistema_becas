//API Routers
var express = require('express');

//var addAPIRouter = function(app){ //HACER ESTO NO FUNCIONA (NODE no la reconoce como funcion)
exports.addAPIRouter = function(app, infHogarCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var informacion = express.Router();
	informacion.route('/informacionHogar')
		.get(infHogarCtrl.getInformacionHogar)
		.post(infHogarCtrl.addInformacionHogar)
		.put(infHogarCtrl.updateInformacionHogar);
		//Dos puntos(:) antecedidos a una palabra, significa que esta será una variable
	//beca4.route('/beca4/:matricula') //la variable 'req', trae como 'params' una variable llamada 'matricula'
	//	.get(UserCtrl.findByMatricula);
	informacion.route('/informacionHogar/:solicitudId')
		.get(infHogarCtrl.findInformacionHogarBySolicitudId)
		.delete(infHogarCtrl.deleteInformacionHogarBySolicitudId);

	informacion.route('/informacionHogar/:tipoCasa/:materialParedes/:materialPiso/:materialTecho/:habitantes/:cuartos/:banios/:focos') //la variable 'req', trae como 'params' una variable llamada 'matricula' y otra llamada 'password'
		.post(infHogarCtrl.addInformacionHogar);

	app.use("/api/v1.0", informacion); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}