var mongoose = require('mongoose');

//Define Schema
var projectsSchema = mongoose.Schema({
	name 			: {type: String},
	priority 		: {type: Number, default : 0},
	budget 			: {type: Number},

	tasks 			: [{
			text: String,
			taskCost: {type: Number, default: 1},
			complete: {type: Boolean, default: false}
		}],

	taskValue		: {type: Boolean, default : false},
	tasksCompleted	: {type: Number},
	owner			: {type: mongoose.Schema.ObjectId, ref : "user"},
});

var projects = mongoose.model('projects', projectsSchema); // this is where the DB collection is named

module.exports = projects;