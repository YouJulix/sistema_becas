var mongoose = require('mongoose');

//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var GastoFam = mongoose.model('GastoFamiliar'); //Creo una instancia del Modelo 'User', el cual ya tiene definido un schema.

exports.deleteSolicitud = function(req,res){
	GastoFam.findByIdAndRemove(req.params.solicitud, function(err){
		console.log('DELETE');
		if(err) return res.status(500).send(err.message);
		res.status(200).send();
	});
}


exports.getAllGastos = function(req, res){
	GastoFam.find(function(err, gastos){
		if(err) 
		res.send(500, err.message);

		console.log('GET /gastosFam')
		res.status(200).jsonp(gastos);
	});
};

exports.findBySolicitud = function(req, res){
	console.log(req.params.solicitud);
	GastoFam.find({"solicitudId" : req.params.solicitud}, function(err, gastos){
		if(err)
			res.send(500, err.message);
		console.log('GET /gastos_familiares/<solic></solic>itudId');
		res.status(200).jsonp(gastos);
	});
}

exports.updateGastos = function(req, res){
	GastoFam.find({"solicitudId": req.params.solicitud},function(err, gastos){
		gastos.agua          = req.body.agua,
		gastos.luz           = req.body.luz,
		gastos.telefono      = req.body.telefono,
		gastos.gas           = req.body.gas,
		gastos.educacion     = req.body.educacion,
		gastos.transporte    = req.body.transporte,
		gastos.rentadomicilio= req.body.rentadomicilio,
		gastos.television    = req.body.television,
		gastos.internet      = req.body.internet,
		gastos.alimentacion  = req.body.alimentacion,
		gastos.vestido       = req.body.vestido,
		gastos.medico        = req.body.medico,
		gastos.diversion     = req.body.diversion,
		gastos.otro          = req.body.otro
		
		var query = {"solicitudId" : req.body.solicitudId};
	    GastoFam.update(query, gastos, function(err, gastos){
        	if(err)
				return res.status(500).send(err.message);
			res.status(200).jsonp(gastos);
		
    	});
		
	});
}

exports.saveGastos = function(req, res){
	console.log('POST');
	console.log(req.body);
	//llave idSolicitud
	var newGasto = new GastoFam({
		solicitudId   : req.body.solicitudId,
		agua          : req.body.agua,
		luz           : req.body.luz,
		telefono      : req.body.telefono,
		gas           : req.body.gas,
		educacion     : req.body.educacion,
		transporte    : req.body.transporte,
		rentadomicilio: req.body.rentadomicilio,
		television    : req.body.television,
		internet      : req.body.internet,
		alimentacion  : req.body.alimentacion,
		vestido       : req.body.vestido,
		medico        : req.body.medico,
		diversion     : req.body.diversion,
		otro          : req.body.otro
	});
	console.log(newGasto);
	newGasto.save( function(err, gast){
		if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(gast);
	});
}