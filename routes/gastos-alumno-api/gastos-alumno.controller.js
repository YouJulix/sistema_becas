var mongoose = require('mongoose');

//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Gastos = mongoose.model('GastosAlumno'); //Creo una instancia del Modelo 'User', el cual ya tiene definido un schema.
/*
.get(GastosCtrl.findGastosBySolicitud)
.post(GastosCtrl.addGastos)
.post(GastosCtrl.updateGastos);		
*/
//GET Gastos por solicitud
exports.findGastosBySolicitud = function(req, res){
	Gastos.find({"becaSolicitud": req.params.solicitud},function(err, gastosAlumno){
		if(err)
			res.send(500, err.message);
		console.log(gastosAlumno);
		res.status(200).jsonp(gastosAlumno);
	});
}
//POST ADD GASTOS
exports.addGastos = function(req, res){
	console.log(req.body);	

	var newGastos = new Gastos({
		becaSolicitud		:	req.body.becaSolicitud,
		gastosMedicos		:	req.body.gastosMedicos,
		isRenta				:	req.body.isRenta,
		transporteMetodo	: 	req.body.transporteMetodo
	});
	
	console.log(newGastos);

	newGastos.save(function(error, gsts){
		if(error) 
			return res.status(500).send(error.message);
		res.status(200).jsonp(gsts);
	});
}

// PUT UPDATE GASTOS
exports.updateGastos = function(req, res){
	console.log("/gastos/update");
	Gastos.find({"becaSolicitud": req.body.becaSolicitud},function(err, gastos){

		gastos[0].gastosMedicos			=	req.body.gastosMedicos,
		gastos[0].isRenta				=	req.body.isRenta,
		gastos[0].transporteMetodo		= 	req.body.transporteMetodo

		gastos[0].save(function(err){
			if(err)
				return res.status(500).send(err.message);
			res.status(200).jsonp(gastos);
		});
	});
}

//DELETE GASTOS ALUMNO
/*
exports.deleteGastosByBecaSolicitud = function(req, res){
	Gastos.remove({"becaSolicitud": req.params.solicitud},function(err,result){
		if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(result);
	})
}*/

exports.deleteGastos = function(req,res){
	Gastos.findByIdAndRemove(req.params.becaSolicitud, function(err){
		console.log('DELETE /gastos/becaId/');
		if(err) 
			return res.status(500).send(err.message);
		res.status(200).send();
	});
};
