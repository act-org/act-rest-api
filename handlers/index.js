
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ACT REST API', req: req, apiContext: '/api/rest/v0.1/' });
};