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

/*exports.addUser = function(req, res){
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

//POST -- ADD Alumno
exports.addUser = function(req,res){
	console.log('POST');
	console.log(req.body);

	var user = new User({
		matricula: 	req.body.matricula,
		password: 	req.body.password,
		password2: 	req.body.password2,
		nombre: 	req.body.nombre,
		apellido1: 	req.body.apellido1,
		apellido2: 	req.body.apellido2,
		fecha_Nac: 	req.body.fecha_Nac,
		carrera: 	req.body.carrera,
		semestre: 	req.body.semestre,
		grupo: 		req.body.grupo,
		sexo: 		req.body.sexo,
		idiomaExt: 	req.body.idiomaExt,
		estdCivil: 	req.body.estdCivil,
		telefono: 	req.body.telefono,
		recidencia: req.body.recidencia,
		calle: 		req.body.calle,
		numCalle: 	req.body.numCalle,
		colonia: 	req.body.colonia,
		municipio: 	req.body.municipio,
		estado: 	req.body.estado,
		nombreHuesped: req.body.nombreHuesped,
		parestesco: req.body.parestesco
	});

	user.save(function(err,user){
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(user);
	});
};

//PUT - UPDATE Alumno
exports.updateAlumno = function(req,res){
	User.findByMatricula({'matricula' : req.params.matricula},function(err,user){

		user.matricula = 	req.body.matricula;
		user.password= 	req.body.password;
		user.password2= 	req.body.password2;
		user.nombre= 		req.body.nombre;
		user.apellido1= 	req.body.apellido1;
		user.apellido2= 	req.body.apellido2;
		user.fecha_Nac= 	req.body.fecha_Nac;
		user.carrera=		req.body.carrera;
		user.semestre= 		req.body.semestre;
		user.grupo=			req.body.grupo;
		user.sexo= 			req.body.sexo;
		user.idiomaExt= 	req.body.idiomaExt;
		user.estdCivil= 	req.body.estdCivil;
		user.telefono= 	req.body.telefono;
		user.recidencia= 	req.body.recidencia;
		user.calle= 		req.body.calle;
		user.numCalle= 	req.body.numCalle;
		user.colonia=	req.body.colonia;
		user.municipio= 	req.body.municipio;
		user.estado= 	req.body.estado;
		user.nombreHuesped= req.body.nombreHuesped;
		user.parestesco= 	req.body.parestesco;

		user.save(function(err){
			if (err) return res.status(500).send(err.message);
			res.status(200).jsonp(user);;
		});
	})
};

//DELETE Alumno
exports.deleteAlumno = function(req,res){
	User.findByMatricula({'matricula' : req.params.matricula},function(err,user){
		user.remove(function(err){
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};