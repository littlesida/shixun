module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/signin');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/home', require('./home'));
  app.use('/createCourse', require('./createCourse'));
  // 404 page
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
