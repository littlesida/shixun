var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var CourseModel = require('../models/courses');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
  //res.render('home');

  var manager = req.session.user.name;

  CourseModel.getCourses(manager)
  .then(function (courses) {
      res.render('home', {
        courses: courses
      });
    })
    .catch(next);

});

router.get('/:name', function(req, res, next) {
  var name = req.params.name;

  Promise.all([
    CourseModel.getCourseByName(name),// 获取签到信息
  ])
  .then(function (result) {
    var course = result[0];
    if (!course) {
      throw new Error('该课程不存在');
    }

    res.render('myCourse', {
      course: course,
    });
  })
  .catch(next);
});

module.exports = router;
