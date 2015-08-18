var ProjectBlock = require('../models/projectlist');

var apiController = {

	get 	: function(req, res){
		// want to be able to get either all the projects or just one
		
		var requestID = req.query._id//req.query only exisits in GET requests other wise it would be req.body

		if(requestID){
			//ONE project
			ProjectBlock.findOne({_id : requestID, owner : req.user._i}, function(err, project){ // find by _id that matches requestID
				res.send(project)
			})
		}
		else{
			//ALL projects
			ProjectBlock.find({owner : req.user._id}, function(err, projects){ //mongoose find() always returns an array
				res.send(projects)
			})
		}

	},

	create 	: function(req, res){
		req.body.tasks = req.body.tasks.split('\n');
		req.body.owner = req.user._id;
		console.log(req.body)
		var project = new ProjectBlock(req.body);
		project.save(function(err, doc){
			res.send(doc);
		});
	},

	update: function(req, res){
		// console.log('id --', req.)
		ProjectBlock.update( { _id : req.body._id}, req.body, function(err, update){
			ProjectBlock.findOne( { _id : req.body._id}, function(err, doc){
				res.send(doc)
			})
		});
		console.log("project task added!!!!!!")
	},

	delete 	: function(req, res){
		// ProjectBlock.delete( { _id : req.body._id}, req.body, function(err, delete){
		// 	ProjectBlock.findOne( { _id : req.body._id}, function(err, doc){
		// 		res.send(doc)
		// 	})
		// });
	}

}

module.exports = apiController;