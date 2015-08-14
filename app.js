var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/api.js')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/orderly')// this is where the DB is being named (the collection will be created on the schema/model.exports)

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // this will parse data for Agular


app.get('/', indexController.index);
app.get('/templates/:templateName', indexController.templates); // route that will serve up jade files

app.get('/api/projects', apiController.get); // /api/projects becomes our 'base' url
app.post('/api/projects', apiController.create);
app.post('/api/projects/:id', apiController.update);
app.delete('/api/projects/:id', apiController.delete);

var server = app.listen(7777, function() {
	console.log('Express server listening on port ' + server.address().port);
});
