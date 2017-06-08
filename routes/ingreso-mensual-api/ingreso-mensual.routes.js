var express = require('express');

exports.addAPIRouter = function(app, ingresoMensualCtrl){
	var ingresoMensual = express.Router();
		ingresoMensual.route('/ingresoMensual')
			.get(ingresoMensualCtrl.findIngresoMensual)
			.put(ingresoMensualCtrl.updateIngresoMensual)
			.post(ingresoMensualCtrl.addIngresoMensual);
		ingresoMensual.route('/ingresoMensual/:solicitudId')
		.get(ingresoMensualCtrl.findBySolicitudId);
	
	app.use("/api/v1.0", ingresoMensual);
}