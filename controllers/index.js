var User = require('../models/user');

var indexController = {
	index: function(req, res) {
		res.render('index', {
	      user: req.user
	    });
	},
	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
	}
};

module.exports = indexController;