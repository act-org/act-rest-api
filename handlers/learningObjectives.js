var utility = require('../utility');
var lom = require('../models/learningObjectives');
var LearningObjectivesModel = lom.LearningObjectivesModel;

exports.list = function(req, res) {

	LearningObjectivesModel.find(function(err, learningObjectives) {
		if (!err) {
			return res.status(200).send(learningObjectives);
		} else {
			return res.status(500).send(err);
		}
	});
};

exports.create = function(req, res) {
	var learningObjective;

	learningObjective = new LearningObjectivesModel({
		learningObjectiveId : req.body.learningObjectiveId,
		academicSubject : req.body.academicSubject,
		description : req.body.description,
		objective : req.body.objective,
		objectiveGradeLevel : req.body.objectiveGradeLevel
	});

	learningObjective.save(function(err) {
		if (!err) {
			res.setHeader('Location', req.protocol + "://" + req.headers.host
					+ req.url + (utility.endsWith(req.url, '/') ? "" : "/")
					+ learningObjective._id);
			res.status(201).send(learningObjective);
		} else {
			res.status(500).send(err);
		}
	});
};

exports.show = function(req, res) {
	LearningObjectivesModel.findById(req.params.id, function(err,
			learningObjective) {
		if (!err) {
			return res.status(200).send(learningObjective);
		} else {
			if ('CastError' === err.name && 'ObjectId' === err.type) {
				return res.status(404).send();
			} else {
				return res.status(500).send(err);
			}
		}
	});
};

exports.destroy = function(req, res) {

	LearningObjectivesModel.findById(req.params.id, function(err,
			learningObjective) {
		if (err || learningObjective === null) {
			return res.status(404).send();
		}
		learningObjective.remove(function(err) {
			if (!err) {
				return res.status(204).send();
			} else {
				return res.status(500).send(err);
			}
		});
	});
};

exports.update = function(req, res) {
	LearningObjectivesModel
			.findById(
					req.params.id,
					function(err, learningObjective) {
								learningObjective.learningObjectiveId = req.body.learningObjectiveId,
								learningObjective.academicSubject = req.body.academicSubject,
								learningObjective.description = req.body.description,
								learningObjective.objective = req.body.objective,
								learningObjective.objectiveGradeLevel = req.body.objectiveGradeLevel;
						if (err || learningObjective === null) {
							return res.status(404).send();
						}
						learningObjective.save(function(err) {
							if (!err) {
								return res.status(200).send(learningObjective);
							} else {
								if ('CastError' === err.name
										&& 'ObjectId' === err.type) {
									return res.status(404).send();
								} else {
									return res.status(500).send(err);
								}
							}
							return res.send(product);
						});
					});
};
