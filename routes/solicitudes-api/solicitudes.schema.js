//SCHEMA //Será un esquema o tambiéb se podría llamar modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  solicitudesSchema = new Schema({
	//var userSchema = new mongoose.Schema({
		//id: {type: String, unique: true },
		matricula: {type: String},
		estado: {type: String },
		porcentaje_sugerido: {type : Number },
		porcentaje_final: {type : Number },	
		libre_de_extra: {type : Boolean },
		biblioteca_completa: {type : Boolean },
		fecha_envio:{type : String },
		caso_especial: Boolean
	},
	{ collection: 'solicitudes' }
);

//Constrains
//userSchema.index({ matricula: 1 }, { unique:true }); //matricula:1 -> Se asegurará que existe matricula, que se mantenga ascendente y 'unique:true' que sea unica

//var UserModel = mongoose.model('User', userSchema);
mongoose.model('Solicitudes', solicitudesSchema); //Exportar/Registramos el schema 'userSchema' al modelo 'User'
//Exportar la base
//