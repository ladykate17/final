var ListBlock = require('../models/lists');

var listApiController = {

	get 	: function(req, res){
		// want to be able to get either all the lists or just one
		
		var requestID = req.query._id//req.query only exisits in GET requests other wise it would be req.body

		if(requestID){
			//ONE list
			ListBlock.findOne({_id : requestID}, function(err, list){ // find by _id that matches requestID
				res.send(list)
			})
		}
		else{
			//ALL lists
			ListBlock.find({}, function(err, lists){ //mongoose find() always returns an array
				res.send(lists)
			})
		}

	},

	create 	: function(req, res){
		req.body.items = req.body.items.split('\n');

		console.log(req.body)
		req.body.owner = req.user._id;
		var list = new ListBlock(req.body);
		list.save(function(err, doc){
			res.send(doc);
		});
	},

	update: function(req, res){
		var task = ListBlock.findOne( { _id : req.params._id} )
		console.log(req.body)
		task.update(req.body)
		.then(function(){
			console.log("list item added!!!!!!")
		})
	},

	delete 	: function(req, res){
		ListBlock.remove({_id : req.params.id}, function(err, result){
			res.send(result);
		});
	}

}

module.exports = listApiController;