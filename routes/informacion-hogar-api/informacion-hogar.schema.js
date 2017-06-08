//SCHEMA //Será un esquema o tambiéb se podría llamar modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  InformacionSchema = new Schema({
	//var userSchema = new mongoose.Schema({
		//_id: 		{type:String},
		solicitudId : { type : String, unique : true },
		tipoCasa:	{ type:String },
		materialParedes:	{ type:String },
		materialPiso:	{ type:String },
		materialTecho:	{ type:String },
		habitantes:	{ type:Number },
		cuartos:	{ type:Number },
		banios:	{ type:Number },
		focos:	{ type:Number }			
	},
	{ collection: 'InformacionHogar' }
);
//Constrains
//beca4Schema.index({ _id: 1 }, { unique:true }); //matricula:1 -> Se asegurará que existe matricula, que se mantenga ascendente y 'unique:true' que sea unica

//var UserModel = mongoose.model('User', userSchema);
mongoose.model('InformacionHogar', InformacionSchema); //Exportar/Registramos el schema 'userSchema' al modelo 'User'
//