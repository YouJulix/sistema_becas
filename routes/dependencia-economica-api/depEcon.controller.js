var mongoose = require('mongoose');

var DepEcon = mongoose.model('DepEcon');

//GET Return all registros de dependencias Economicas
exports.findAllDepsEcons = function(req, res){
	DepEcon.find(function(err, depEcon){ //Las funciones que se mandan como parametro, son las funciones que se ejecutan despues de que el metodo(find, save,..) se ejecuta
		if(err){
			res.send(500, err.message);
		}
		console.log('GET /dep_econ');
		res.status(200).jsonp(depEcon);
	});
}

exports.findBySolicitudId = function(req, res){
	DepEcon.find({ "solicitudId" : req.params.solicitudId }, function(err, depEcon){
		if(err)
			res.send(500, err.message);
		res.status(200).jsonp(depEcon);
	})
}

exports.addDepEcon = function(req, res){
	console.log('POST');
	console.log(req.body);

	var depEcon = new DepEcon({
		solicitudId : req.body.solicitudId,
		escolaridad : req.body.escolaridad,
		tipoTrabajo : req.body.tipoTrabajo
	});

	depEcon.save(function(err, depEcon){
		if (err) 
			return res.status(500).send(err.message);
		res.status(200).send(depEcon);

	})
}