
//SCHEMA //Será un esquema o  modelo de como será la estructura de una colección
var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var  ingresoMensualSchema = new Schema({
		ingresoMenJefe: 	{type:String},
		ingresoMenGubernamental: 	{type:String},
		ingresoMenTerceros: 	{type:String},
		solicitudId: {type:String, unique : true }
	},
	{ collection: 'ingresoMensual' }
);
//Constrains
ingresoMensualSchema.index({unique:true}); 
mongoose.model('ingresoMensual', ingresoMensualSchema); //Exportar/Registramos el schema 'ingresoMensualSchema' al modelo 'ingresoMensual'