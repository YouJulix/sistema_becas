var mongoose = require('mongoose');

//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Solicitudes = mongoose.model('Solicitudes'); //Creo una instancia del Modelo 'User', el cual ya tiene definido un schema.

//GET - Return all tvshows in the DB
exports.findAllSolicitudes = function(req, res) {  
    Solicitudes.find(function(err, solicitudes) { //CUando hacemos un find directo, es como si estuvieramos haciendo: collection.find(); //Se muestra todo
	if(err) 
		res.send(500, err.message);

	console.log('GET /solicitudes')
	res.status(200).jsonp(solicitudes);
    });
};

exports.findByMatricula = function(req, res){
	console.log('GET');
	console.log(req.body);

	Solicitudes.find( {"matricula" : req.params.matricula}, function(err, solicitudes){ //En este caso ya no es un find directo, sino uno que pide explicitamente 'matricula': variable_matricula_recibida_en_la_URL
		if(err)
			res.send(500, err.message);
		console.log('GET /solicitudes/matricula');
		res.status(200).jsonp(solicitudes);
	});
}

exports.addSolicitudes = function(req, res){
	console.log('POST');
	console.log(req.body);

	var solicitudes = new Solicitudes({
		//id:	req.body.id,
		matricula: req.body.matricula,
		estado:	req.body.estado,
		porcentaje_sugerido: 	req.body.porcentaje_sugerido,
		porcentaje_final: req.body.porcentaje_final,
		libre_de_extra: req.body.libre_de_extra,
		biblioteca_completa: req.body.biblioteca_completa,
		fecha_envio: req.body.fecha_envio
	});
	solicitudes.save( function(err, solicitudes){
		if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(solicitudes);
	});
}


//DELETE Solicitudes

exports.findById = function(req, res) {  
    Solicitudes.findById(req.params._id, function(err, solicitudes) {
    if(err) return res.send(500, err.message);

    console.log('GET /solicitudes/id/' + req.params._id);
        if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(solicitudes);
	});
};

//DELETE Alumno
exports.deleteSolicitudes = function(req,res){
	//Solicitudes.find({'_id' : req.params._id},function(err,solicitudes){
		Solicitudes.findByIdAndRemove(req.params._id, function(err){
			console.log('DELETE /solicitudes/id/');
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	//});
};


exports.updateSolicitudes = function(req, res) {  
    Solicitudes.find({'_id' : req.params._id},function(err,solicitudes){
        //solicitudes.matricula   = req.body.matricula;
        solicitudes[0].estado    = req.body.estado;
        solicitudes[0].porcentaje_sugerido = req.body.porcentaje_sugerido;
        solicitudes[0].porcentaje_final  = req.body.porcentaje_final;
        solicitudes[0].libre_de_extra = req.body.libre_de_extra;
        solicitudes[0].biblioteca_completa   = req.body.biblioteca_completa;
        solicitudes[0].fecha_envio = req.body.fecha_envio;

        solicitudes[0].save(function(err) {
        	console.log("UPDATE /solicitudes/id/");
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(solicitudes);
        });
    });
};