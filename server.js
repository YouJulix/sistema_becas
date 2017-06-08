var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var app = express();
var port = 8000;

//INstancias de rutas, Modelos y controladores
var users_routes = require('./routes/users-api/users.routes'); //Routes y app.use(...)
var UserModel = require('./routes/users-api/users.schema'); //Instancio el codigo 'users.schema.js' en la variable UserModel, el codigo de 'users.schema.js' registra un schema al modelo 'User', para que posteriormente dicho modelo se pueda utilizar en el controlador (Busquedas sobre ese modelo base)
var UserCtrl = require('./routes/users-api/users.controller'); //Instancio el codigo 'users.controller.js' en la variable UserCtrl,


//Api sobre gastos de los alumnos
var GstsAl_routes = require('./routes/gastos-alumno-api/gastos-alumno.routes');
var GstsAlModel = require('./routes/gastos-alumno-api/gastos-alumno.schema');
var GstsAlCtrl = require('./routes/gastos-alumno-api/gastos-alumno.controller');



var depEconRoutes = require('./routes/dependencia-economica-api/depEcon.routes'); //Routes y app.use(...)
var depEconModel = require('./routes/dependencia-economica-api/depEcon.schema'); //Instancio el codigo 'users.schema.js' en la variable UserModel, el codigo de 'users.schema.js' registra un schema al modelo 'User', para que posteriormente dicho modelo se pueda utilizar en el controlador (Busquedas sobre ese modelo base)
var depEconCtrl = require('./routes/dependencia-economica-api/depEcon.controller'); //Instancio el codigo 'users.controller.js' en la variable UserCtrl,

//Instancias de rutas, Modelos y controladores de informacion del hogar
var infHogar_routes = require('./routes/informacion-hogar-api/informacion-hogar.routes'); //Routes y app.use(...)
var infHogarModel = require('./routes/informacion-hogar-api/informacion-hogar.schema'); //Instancio el codigo 'users.schema.js' en la variable UserModel, el codigo de 'users.schema.js' registra un schema al modelo 'User', para que posteriormente dicho modelo se pueda utilizar en el controlador (Busquedas sobre ese modelo base)
var infHogarCtrl = require('./routes/informacion-hogar-api/informacion-hogar.controller'); //Instancio el codigo 'users.controller.js' en la variable UserCtrl,

//Ingresos Mensuales
var ingresoMensual_routes = require('./routes/ingreso-mensual-api/ingreso-mensual.routes');
var ingresoMensualModel = require('./routes/ingreso-mensual-api/ingreso-mensual.schema');
var ingresoMensualCtrl = require('./routes/ingreso-mensual-api/ingreso-mensual.controller');


//Connection to BD
mongoose.connect(db.url);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//IMPORTANTE! vamos a DEFINIR donde vamos a SERVIR la pagina web del FRONT END, index.html, style.css, bootstrap, angular, etc..
//app.use(express.static(__dirname + '/public')); //Igual funciona
app.use(express.static('public')); //Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado express.static de Express.


//API routes
users_routes.addAPIRouter(app, UserCtrl); //Apuntadores a app y a UsaerCtrl //La funcion addAPIRouter enlaza rutas de un api que creamos a sus controladores(funciones); y hace que 'app' use esas rutas(app.use())
depEconRoutes.addAPIRouter(app, depEconCtrl);
//API gastos alumnos
GstsAl_routes.addAPIRouter(app, GstsAlCtrl)

//API infomacion del hogar
infHogar_routes.addAPIRouter(app,infHogarCtrl);

// ingreso mensual
ingresoMensual_routes.addAPIRouter(app, ingresoMensualCtrl);

//Start Server
app.listen(port, function(){
	console.log("Node server running on http://localhost:" + port);
});
