var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var app = express();
var port = 8000;

var users_routes = require('./routes/users-api/users.routes'); //Models and Controllers
var UserModel = require('./routes/users-api/users.schema'); //Instancio el codigo 'users.schema.js' en la variable UserModel, el codigo de 'users.schema.js' registra un schema al modelo 'User', para que posteriormente dicho modelo se pueda utilizar en el controlador (Busquedas sobre ese modelo base)
var UserCtrl = require('./routes/users-api/users.controller'); //Instancio el codigo 'users.controller.js' en la variable UserCtrl,

//Connection to BD
mongoose.connect(db.url);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//API routes
users_routes.addAPIRouter(app, UserCtrl);
//Start Server
app.listen(port, function(){
	console.log("Node server running on http://localhost:" + port);
});





