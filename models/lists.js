var mongoose = require('mongoose');

//Define Schema
var listsSchema = mongoose.Schema({
	name 		: {type: String},
	budget 		: {type: Number},
	items 		: [],
	owner		: { type: mongoose.Schema.ObjectId, ref : "user"},

});

var lists = mongoose.model('lists', listsSchema); // this is where the DB collection is named

module.exports = lists;