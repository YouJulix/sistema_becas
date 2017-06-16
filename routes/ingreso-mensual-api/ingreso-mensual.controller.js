var mongoose = require('mongoose');

//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var ingresoMensual = mongoose.model('ingresoMensual'); //Creo una instancia del Modelo 'ingresoMensual', el cual ya tiene definido un schema.

//GET - Return all tvshows in the DB
exports.findIngresoMensual = function(req, res) {  
    ingresoMensual.find(function(err, ingreso) { //CUando hacemos un find directo, es como si estuvieramos haciendo: collection.find(); //Se muestra todo
	if(err) 
		res.send(500, err.message);
		console.log('GET /ingresoMensual')
		res.status(200).jsonp(ingreso);
    });
};


exports.findBySolicitudId = function(req, res){
	ingresoMensual.find( {"solicitudId" : req.params.solicitudId}, function(err, ingresos){
		if(err)
			res.send(500, err.message);
		console.log('GET /ingresoMensual/solicitudId');
		res.status(200).jsonp(ingresos);
	});
}

//POST -- Add ingresoMensual
exports.addIngresoMensual = function(req,res){
	console.log('POST');
	console.log(req.body);

	var ingresoMen = new ingresoMensual({
		ingresoMenJefe: 	req.body.ingresoMenJefe,
		ingresoMenGubernamental: req.body.ingresoMenGubernamental,
		ingresoMenTerceros: 	req.body.ingresoMenTerceros,
		solicitudId: req.body.solicitudId
	});

	ingresoMen.save(function(err,ingresoMen){
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(ingresoMen);
	});
};

//PUT Actualizar informacion relacionada con ingresos mensuales

exports.updateIngresoMensual = function(req,res){
	console.log('PUT');
	console.log(req.body);

	ingresoMensual.find({"solicitudId": req.body.solicitudId},function(err, ingresosm){
		
		ingresosm.ingresoMenJefe = req.body.ingresoMenJefe,
		ingresosm.ingresoMenGubernamental = req.body.ingresoMenGubernamental,
		ingresosm.ingresoMenTerceros = req.body.ingresoMenTerceros
		
		var query = {"solicitudId": req.body.solicitudId};
	    ingresoMensual.update(query, ingresosm, function(err, ingresom){
        	if(err)
				return res.status(500).send(err.message);
			res.status(200).jsonp(ingresom);
		
    	});
		
	});
};

