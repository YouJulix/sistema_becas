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
	User.find({'matricula':req.params.matricula}, function(err, user){ //En este caso ya no es un find directo, sino uno que pide explicitamente 'matricula': variable_matricula_recibida_en_la_URL
		if(err) return res.send(500, err.message);
		console.log('GET /users/'+req.params.matricula);
		console.log(user);
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
		fechaNac: 	req.body.fechaNac,
		carrera: 	req.body.carrera,
		semestre: 	req.body.semestre,
		grupo: 		req.body.grupo,
		sexo: 		req.body.sexo,
		idiomaExt: 	req.body.idiomaExt,
		edoCivil: 	req.body.edoCivil,
		telefono: 	req.body.telefono,
		recidencia: req.body.recidencia,
		calle: 		req.body.calle,
		numCalle: 	req.body.numCalle,
		colonia: 	req.body.colonia,
		municipio: 	req.body.municipio,
		estado: 	req.body.estado,
		nombreHuesped: req.body.nombreHuesped,
		parentesco: req.body.parentesco,
		isAdmin : req.body.isAdmin
	});

	user.save(function(err,user){
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(user);
	});
};

//PUT - UPDATE Usuario
exports.updateUser = function(req,res){
	User.find({'matricula' : req.params.matricula},function(err,user){

		//user[0].matricula = 	req.body.matricula;
		user[0].password= 	req.body.password;
		user[0].password2= 	req.body.password2;
		user[0].nombre= 		req.body.nombre;
		user[0].apellido1= 	req.body.apellido1;
		user[0].apellido2= 	req.body.apellido2;
		user[0].fechaNac= 	req.body.fechaNac;
		user[0].carrera=		req.body.carrera;
		user[0].semestre= 		req.body.semestre;
		user[0].grupo=			req.body.grupo;
		user[0].sexo= 			req.body.sexo;
		user[0].idiomaExt= 	req.body.idiomaExt;
		user[0].edoCivil= 	req.body.edoCivil;
		user[0].telefono= 	req.body.telefono;
		user[0].recidencia= 	req.body.recidencia;
		user[0].calle= 		req.body.calle;
		user[0].numCalle= 	req.body.numCalle;
		user[0].colonia=	req.body.colonia;
		user[0].municipio= 	req.body.municipio;
		user[0].estado= 	req.body.estado;
		user[0].nombreHuesped= req.body.nombreHuesped;
		user[0].parentesco= 	req.body.parentesco;

		user[0].save(function(err){
			if (err) return res.status(500).send(err.message);
			res.status(200).jsonp(user);;
		});
	});
};

//DELETE Alumno
exports.deleteUser = function(req,res){
	User.findByMatricula({'matricula' : req.params.matricula},function(err,user){
		user.remove(function(err){
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		})
	});
};