/**
 * Module dependencies.
 */

var express = require('express'), http = require('http'), path = require('path');
var apiContext = '/api/rest/v0.1/';

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//mongo setup
var mongoose = require('mongoose/');
var mongourl;

if(process.env.VCAP_SERVICES){
   //app is running in the cloud
   var svcs = JSON.parse(process.env.VCAP_SERVICES);
   mongourl = svcs['mongodb'][0].credentials.uri;
}
else{
   //running locally or not on cloud foundry
   mongourl = 'mongodb://localhost/act-standards-db'; 
}

mongoose.connect(mongourl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
}); 

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

var routes = require('./routes')(app, apiContext);

http.createServer(app).listen(app.get('port'), function() {
	console.log('ACT Rest Server listening on port ' + app.get('port'));
});
