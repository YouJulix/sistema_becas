var mongoose = require('mongoose');

//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var User = mongoose.model('User'); //Creo una instancia del Modelo 'User', el cual ya tiene definido un schema.

//GET - Return all tvshows in the DB
exports.findAllUsers = function(req, res) {  
    User.find(function(err, users) { //CUando hacemos un find directo, es como si estuvieramos haciendo: collection.find(); //Se muestra todo
	if(err) 
		res.send(500, err.message);

	console.log('GET /users')
	res.status(200).jsonp(users);
    });
};

exports.findByMatricula = function(req, res){
	User.find( {"matricula" : req.params.matricula}, function(err, user){ //En este caso ya no es un find directo, sino uno que pide explicitamente 'matricula': variable_matricula_recibida_en_la_URL
		if(err)
			res.send(500, err.message);
		console.log('GET /users/matricula');
		res.status(200).jsonp(user);
	});
}

exports.checkUser = function(req, res){
	User.find( {"matricula" : req.params.matricula, "password" : req.params.password}, function(err, user){ //En este caso ya no es un find directo, sino uno que pide explicitamente 'matricula': variable_matricula_recibida_en_la_URL, 'password' : variable_password_recibida_en_la_URL
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
}