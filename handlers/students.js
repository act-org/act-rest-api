var utility = require('../utility');
var sm = require('../models/students');
var StudentsModel = sm.StudentsModel;

exports.list = function(req, res) {

	StudentsModel.find(function(err, students) {
		if (!err) {
			var jwt = req.headers['x-jwt-assertion'];
			console.log(req.headers);
			if(jwt) {
				return res.status(200).send(students + new Buffer(jwt, 'base64'));				
			} else {
				return res.status(200).send(students);
			}

		} else {
			return res.status(500).send(err);
		}
	});
};

exports.create = function(req, res) {
	var student;

	student = new StudentsModel({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		birthDate : req.body.birthDate
	});

	student.save(function(err) {
		if (!err) {
			res.setHeader('Location', req.protocol + "://" + req.headers.host
					+ req.url + (utility.endsWith(req.url, '/') ? "" : "/")
					+ student._id);
			res.status(201).send(student);
		} else {
			res.status(500).send(err);
		}
	});
};

exports.show = function(req, res) {
	StudentsModel.findById(req.params.id, function(err, student) {
		if (!err) {
			return res.status(200).send(student);
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

	StudentsModel.findById(req.params.id, function(err, student) {
		if (err || student === null) {
			return res.status(404).send();
		}
		student.remove(function(err) {
			if (!err) {
				return res.status(204).send();
			} else {
				return res.status(500).send(err);
			}
		});
	});
};

exports.update = function(req, res) {
	StudentsModel.findById(req.params.id, function(err, student) {
		student.firstName = req.body.firstName,
				student.lastName = req.body.lastName,
				student.birthDate = req.body.birthDate;

		if (err || student === null) {
			return res.status(404).send();
		}
		student.save(function(err) {
			if (!err) {
				return res.status(200).send(student);
			} else {
				if ('CastError' === err.name && 'ObjectId' === err.type) {
					return res.status(404).send();
				} else {
					return res.status(500).send(err);
				}
			}
			return res.send(product);
		});
	});
};
