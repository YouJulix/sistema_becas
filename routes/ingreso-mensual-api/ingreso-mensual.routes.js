var express = require('express');

exports.addAPIRouter = function(app, ingresoMensualCtrl){
	var ingresoMensual = express.Router();
		ingresoMensual.route('/ingresoMensual')
			.get(ingresoMensualCtrl.findIngresoMensual)
			.post(ingresoMensualCtrl.addIngresoMensual)
			.put(ingresoMensualCtrl.updateIngresoMensual);
		ingresoMensual.route('/ingresoMensual/:solicitudId')
		.get(ingresoMensualCtrl.findBySolicitudId)
		.put(ingresoMensualCtrl.updateIngresoMensual);
		
	
	app.use("/api/v1.0", ingresoMensual);
}