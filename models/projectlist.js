var mongoose = require('mongoose');

//Define Schema
var projectsSchema = mongoose.Schema({
	name 		: {type: String},
	priority 	: {type: Number, default : 0},
	budget 		: {type: Number},
	tasks 		: []
});

var projects = mongoose.model('projects', projectsSchema); // this is where the DB collection is named

module.exports = projects;