var mongoose = require('mongoose');

//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Informacion = mongoose.model('InformacionHogar'); //Creo una instancia del Modelo 'User', el cual ya tiene definido un schema.

//GET - Return all tvshows in the DB
exports.findInformacionHogarBySolicitudId = function(req, res){
	Informacion.find({"solicitudId": req.params.solicitudId},function(err, informacions){
		if(err)
			res.send(500, err.message);
		console.log(informacions);
		res.status(200).jsonp(informacions);
	});
}
exports.addInformacionHogar = function(req, res) {  
	console.log('POST');
	console.log(req.body);

	var informacion = new Informacion({
		solicitudId: req.body.solicitudId,
		tipoCasa:	req.body.tipoCasa,
		materialParedes:	req.body.materialParedes,
		materialPiso:	req.body.materialPiso,
		materialTecho:	req.body.materialTecho,
		habitantes:	req.body.habitantes,
		cuartos:	req.body.cuartos,
		banios:	req.body.banios,
		focos:	req.body.focos
	});
	informacion.save( function(err, informacion){
		if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(informacion);
	});
}

exports.updateInformacionHogar = function(req, res) {  
	console.log('PUT');
	console.log(req.body);

	Informacion.find({"solicitudId": req.params.solicitudId},function(err, informacion){

		informacion.solicitudId 		= req.body.solicitudId,
		informacion.tipoCasa			=	req.body.tipoCasa,
		informacion.materialParedes		=	req.body.materialParedes,
		informacion.materialPiso		=	req.body.materialPiso,
		informacion.materialTecho		=	req.body.materialTecho,
		informacion.habitantes			=	req.body.habitantes,
		informacion.cuartos				=	req.body.cuartos,
		informacion.banios				=	req.body.banios,
		informacion.focos				=	req.body.focos
		
		/*
		Informacion.update(function(err){
			if(err)
				return res.status(500).send(err.message);
			res.status(200).jsonp(informacion);
		});*/

		var query = {"solicitudId" : req.body.solicitudId};
	    Informacion.update(query, informacion, function(err, doc){
        	if(err)
				return res.status(500).send(err.message);
			res.status(200).jsonp(doc);
		
    	});



	});
}

exports.getInformacionHogar = function(req, res) {  
    Informacion.find(function(err, informacions) { //CUando hacemos un find directo, es como si estuvieramos haciendo: collection.find(); //Se muestra todo
	if(err) 
		res.send(500, err.message);

	console.log('GET /informacions')
	res.status(200).jsonp(informacions);
    });
};
/*
exports.findByMatricula = function(req, res){
	User.find( {"matricula" : req.body.matricula}, function(err, user){ //En este caso ya no es un find directo, sino uno que pide explicitamente 'matricula': variable_matricula_recibida_en_la_URL
		if(err)
			res.send(500, err.message);
		console.log('GET /users/matricula');
		res.status(200).jsonp(user);
	});
}

exports.checkUser = function(req, res){
	User.find( {"matricula" : req.body.matricula, "password" : req.body.password}, function(err, user){ //En este caso ya no es un find directo, sino uno que pide explicitamente 'matricula': variable_matricula_recibida_en_la_URL, 'password' : variable_password_recibida_en_la_URL
		if(err)
			res.send(500, err.message);
		console.log('GET /users/matricula/password');
		res.status(200).jsonp(user);
	});	
}

exports.addUser = function(req, res){
	console.log('POST');
	console.log(req.body);

	var user = new User({
		matricula:	req.body.matricula,
		password:	req.body.password,
		nombre: 	req.body.nombre
	});
	user.save( function(err, user){
		if(err)
			return res.status(500).send(err.message);
		res.status(200).jsonp(user);
	});
}*/