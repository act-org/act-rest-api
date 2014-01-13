var mongoose = require('mongoose');

var learningObjectivesSchema = mongoose.Schema({
	learningObjectiveId : String,
	academicSubject : String,
	description : String,
	objective : String,
	objectiveGradeLevel : String
});

exports.LearningObjectivesModel = mongoose.model('LearningObjectivesModel',
		learningObjectivesSchema);