var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
var CourseModel = require('../models/courses');

router.get('/', checkLogin, function (req, res, next) {
  var courseName = req.query.courseName;
  Promise.all([
    CourseModel.getCourseByName(courseName),// 获取课程信息
  ])
  .then(function (result) {
    var course = result[0];
    if (!course) {
      req.flash('error', '该课程不存在'); 
      console.log('该课程不存在');
      return res.redirect('back');//返回之前的页面
    } else if (course.manager != req.session.user.name) {
      req.flash('error', '您不是该课程的管理员'); 
      console.log('您不是该课程的管理员');
      return res.redirect('back');//返回之前的页面
    }
  console.log("course is "+course);
  res.render('createSign', {
    course : course
  });
})
  .catch(next);
});

module.exports = router;