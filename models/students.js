var mongoose = require('mongoose');

var studentsSchema = mongoose.Schema({
	firstName : String,
	lastName : String,
	birthDate : Date
});

exports.StudentsModel = mongoose.model('StudentsModel', studentsSchema);