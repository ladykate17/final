var ProjectBlock = require('../models/projectlist');

var apiController = {

	get 	: function(req, res){
		// want to be able to get either all the projects or just one
		
		var requestID = req.query._id//req.query only exisits in GET requests other wise it would be req.body

		if(requestID){
			//ONE project
			ProjectBlock.findOne({_id : requestID}, function(err, project){ // find by _id that matches requestID
				res.send(project)
			})
		}
		else{
			//ALL projects
			ProjectBlock.find({}, function(err, projects){ //mongoose find() always returns an array
				res.send(projects)
			})
		}

	},

	create 	: function(req, res){
		// $scope.inputs = []

		// console.log(req.body)
		var project = new ProjectBlock(req.body);
		project.save(function(err, doc){
			res.send(doc);
		});
	},

	update: function(req, res){
		var task = ProjectBlock.findOne( { _id : req.params._id} )
		console.log(req.body)
		task.update(req.body)
		.then(function(){
			console.log("working!!!!!!")
		})
	},

	delete 	: function(req, res){
		ProjectBlock.remove({_id : req.params.id}, function(err, result){
			res.send(result);
		});
	}

}

module.exports = apiController;