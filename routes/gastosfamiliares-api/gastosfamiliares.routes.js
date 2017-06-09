//API Routers
var express = require('express');

//var addAPIRouter = function(app){ //HACER ESTO NO FUNCIONA (NODE no la reconoce como funcion)
exports.addAPIRouter = function(app, gastosCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var gastos_familiares = express.Router();
	gastos_familiares.route('/gastos_familiares')
		.post(gastosCtrl.saveGastos)
		.put(gastosCtrl.updateGastos)
		.get(gastosCtrl.getAllGastos);
	gastos_familiares.route('/gastos_familiares/:solicitud')
		.get(gastosCtrl.findBySolicitud);
	app.use("/api/v1.0", gastos_familiares); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}