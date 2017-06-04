var express = require('express');

exports.addAPIRouter = function(app, depEconCtrl){
	var depsEcons = express.Router();
		depsEcons.route('/deps_econs')
			.get(depEconCtrl.findAllDepsEcons)
			.post(depEconCtrl.addDepEcon);
	
	app.use('/api/v1.0', depsEcons);
}