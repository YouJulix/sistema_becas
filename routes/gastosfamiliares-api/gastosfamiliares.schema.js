//SCHEMA //Será un esquema o tambiéb se podría llamar modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  gastofamiliarSchema = new Schema({
	//var userSchema = new mongoose.Schema({
		solicitudId	  : { type: String, unique : true },
		agua          : { type: Number },
		luz           : { type: Number },
		telefono      : { type: Number },
		gas           : { type: Number },
		educacion     : { type: Number },
		transporte    : { type: Number },
		rentadomicilio: { type: Number },
		television    : { type: Number },
		internet      : { type: Number },
		alimentacion  : { type: Number },
		vestido       : { type: Number },
		medico        : { type: Number },
		diversion     : { type: Number },
		otro          : { type: Number }
	},
	{ collection: 'gastosFamiliares' }
);
//Constrains
//gastosfamiliares.index({ matricula: 1 }, { unique:true }); //matricula:1 -> Se asegurará que existe matricula, que se mantenga ascendente y 'unique:true' que sea unica

//var UserModel = mongoose.model('User', userSchema);
mongoose.model('GastoFamiliar', gastofamiliarSchema); //Exportar/Registramos el schema 'userSchema' al modelo 'User'
//