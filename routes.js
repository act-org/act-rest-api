var routes = require('./handlers');
var learningObjectives = require('./handlers/learningObjectives');
var students = require('./handlers/students');

module.exports = function(app, apiContext) {
  app.get('/', routes.index);
  
  app.get(apiContext + 'learningObjectives', learningObjectives.list);
  app.post(apiContext + 'learningObjectives', learningObjectives.create);
  app.get(apiContext + 'learningObjectives/:id', learningObjectives.show);
  app.delete(apiContext + 'learningObjectives/:id', learningObjectives.destroy);
  app.put(apiContext + 'learningObjectives/:id', learningObjectives.update);
 
  app.get(apiContext + 'students', students.list);
  app.post(apiContext + 'students', students.create);
  app.get(apiContext + 'students/:id', students.show);
  app.delete(apiContext + 'students/:id', students.destroy);
  app.put(apiContext + 'students/:id', students.update);
};