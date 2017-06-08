//SCHEMA //Será un esquema o tambiéb se podría llamar modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  gastosAlumnoSchema = new Schema({
	//var userSchema = new mongoose.Schema({
		becaSolicitud		:	{ type:Number },
		gastosMedicos		:	{ type:String },
		isRenta				:	{ type:Object },
		transporteMetodo	: 	{ type:Object }
	},
	
	{ collection: 'gastosAlumnos' }
);
//Constrains
gastosAlumnoSchema.index({unique:true}); //matricula:1 -> Se asegurará que existe matricula, que se mantenga ascendente y 'unique:true' que sea unica

//var UserModel = mongoose.model('User', userSchema);
mongoose.model('GastosAlumno', gastosAlumnoSchema); //Exportar/Registramos el schema 'userSchema' al modelo 'User'
//