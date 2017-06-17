var express = require('express');

exports.addAPIRouter = function(app, depEconCtrl){
	var depsEcons = express.Router();
		depsEcons.route('/deps_econs')
			.get(depEconCtrl.findAllDepsEcons)
			.post(depEconCtrl.addDepEcon)
			.put(depEconCtrl.updateDepEcon);
		depsEcons.route('/deps_econs/:solicitudId').
			get(depEconCtrl.findBySolicitudId)
			.delete(depEconCtrl.deleteSolicitudById);
	
	app.use('/api/v1.0', depsEcons);
}