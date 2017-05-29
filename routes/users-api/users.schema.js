//SCHEMA //Será un esquema o tambiéb se podría llamar modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  userSchema = new Schema({
	//var userSchema = new mongoose.Schema({
		matricula:	{ type:String },
		password:	{ type:String },
		nombre:		{ type:String }
	},
	{ collection: 'users' }
);
//Constrains
userSchema.index({ matricula: 1 }, { unique:true }); //matricula:1 -> Se asegurará que existe matricula, que se mantenga ascendente y 'unique:true' que sea unica

//var UserModel = mongoose.model('User', userSchema);
mongoose.model('User', userSchema); //Exportar/Registramos el schema 'userSchema' al modelo 'User'
//