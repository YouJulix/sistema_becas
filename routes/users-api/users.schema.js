//SCHEMA //Será un esquema o tambiéb se podría llamar modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  userSchema = new Schema({
	//var userSchema = new mongoose.Schema({
		matricula: 	{type:String},
		password: 	{type:String},
		password2: 	{type:String},
		nombre: 	{type:String},
		apellido1: 	{type:String},
		apellido2: 	{type:String},
		fechaNac: 	{type:String},
		carrera: 	{type:String},
		semestre: 	{type:String},
		grupo: 		{type:String},
		sexo: 		{type:String},
		idiomaExt: 	{type:String},
		edoCivil: 	{type:String},
		telefono: 	{type:String},
		recidencia: {type:String},
		calle: 		{type:String},
		numCalle: 	{type:String},
		colonia: 	{type:String},
		municipio: 	{type:String},
		estado: 	{type:String},
		nombreHuesped: {type:String},
		parentesco: {type:String}
	},
	{ collection: 'users' }
);
//Constrains
userSchema.index({ matricula: 1 }, { unique:true }); //matricula:1 -> Se asegurará que existe matricula, que se mantenga ascendente y 'unique:true' que sea unica

//var UserModel = mongoose.model('User', userSchema);
mongoose.model('User', userSchema); //Exportar/Registramos el schema 'userSchema' al modelo 'User'
//