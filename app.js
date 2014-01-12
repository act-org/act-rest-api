/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), mers = require('mers');

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

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

// mongo setup vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var mongoose = require('mongoose/'), Schema = mongoose.Schema, ObjectId = mongoose.Schema.ObjectId;
var mongourl;
if (process.env.VCAP_SERVICES) {
	// app is running in the cloud
	var svcs = JSON.parse(process.env.VCAP_SERVICES);
	mongourl = svcs['mongodb'][0].credentials.uri;
} else {
	// running locally or not on cloud foundry
	mongourl = 'mongodb://localhost/act-rest-db';
}

var StudentAssessmentsSchema = new Schema({
	title : String,
	date : Date,
	result : String
});
var StudentsSchema = new Schema({
	firstName : String,
	lastName : String,
	birthDate : Date,
	assessments : [ StudentAssessmentsSchema ]
});
StudentsSchema.statics.findNameLike = function findNameLike(q, term) {
	return this.find({
		 'firstName' : new RegExp(q.firstName || term, 'i')
	});
};
var StudentAssessments = module.exports.StudentAssessments = mongoose.model(
		'StudentAssessments', StudentAssessmentsSchema);
var Students = module.exports.Students = mongoose.model('Students',
		StudentsSchema);
// mongo setup ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

app.use('/api/rest/v0.1', mers({
	uri : mongourl,
	error : function(err, req, res, next){
		console.log(err);
		if('CastError' === err.name && 'ObjectId' === err.type) {
		  res.status(404).send({
              status:404,
              error:err && err.message
          });
		} else {
		  res.status(500).send({
	              status:500,
	              error:err && err.message
	      });	
		}
	}}).rest());

          
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
