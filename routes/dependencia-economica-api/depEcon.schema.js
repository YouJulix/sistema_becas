var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var depEconSchema = new Schema({
		solicitudId : { type : String, unique : true },
		escolaridad : { type : String },
		tipoTrabajo : { type : String }
	},
	{
		collection : 'dependencia_economica'
	}
);
mongoose.model('DepEcon', depEconSchema);//Exportar/Registramos el schema 'depEconSchema' al modelo 'DepEcon'