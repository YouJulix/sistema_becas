//API Routers
var express = require('express');

exports.addAPIRouter = function(app, GastosCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var gastos = express.Router();
	gastos.route('/gastos')
		.post(GastosCtrl.addGastos)
		.put(GastosCtrl.updateGastos);

	gastos.route('/gastos/:solicitud')
		.get(GastosCtrl.findGastosBySolicitud)
<<<<<<< HEAD
		.delete(GastosCtrl.deleteGastosByBecaSolicitud); 
=======
		.put(GastosCtrl.updateGastos)
		.delete(GastosCtrl.deleteGastos); 
		
>>>>>>> 066d94b541c3a24bf6e3ff677f3d9663cf03137e

	app.use("/api/v1.0", gastos); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}