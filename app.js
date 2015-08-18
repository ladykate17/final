var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var authenticationController = require('./controllers/authentication'); // Passport
var projectApiController = require('./controllers/project-api.js')
var listApiController = require('./controllers/list-api.js')


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/orderly')// this is where the DB is being named (the collection will be created on the schema/model.exports)

var session = require('express-session'); // Passport
var cookieParser = require('cookie-parser'); // Passport
var flash = require('connect-flash'); // Passport
var passport = require('passport'); // Passport
var passportConfig = require('./config/passport'); // Passport

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // this will parse data for Agular


app.use(cookieParser()); // Passport
app.use(flash()); // Passport

app.use(session({ // Passport
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize()); // Passport
app.use(passport.session());// Passport


// Our get request for viewing the login page // Passport
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form // Passport
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form // Passport
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url // Passport
app.get('/auth/logout', authenticationController.logout);


app.use(passportConfig.ensureAuthenticated); // Passport



app.get('/', indexController.index);
app.get('/templates/:templateName', indexController.templates); // route that will serve up jade files

app.get('/api/projects', projectApiController.get); 
app.post('/api/projects', projectApiController.create);
app.post('/api/projects/:id', projectApiController.update);
app.delete('/api/projects/:id', projectApiController.delete);

app.get('/api/lists', listApiController.get); 
app.post('/api/lists', listApiController.create);
app.post('/api/lists/:id', listApiController.update);
app.delete('/api/lists/:id', listApiController.delete);

var server = app.listen(7777, function() {
	console.log('Express server listening on port ' + server.address().port);
});
