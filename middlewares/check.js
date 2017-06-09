var CourseModel = require('../models/courses');
var SignModel = require('../models/sign');

module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录'); 
      return res.redirect('/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录'); 
      return res.redirect('back');//返回之前的页面
    }
    next();
  },

  checkCourseBelong: function checkCourseBelong(req, res, next) {
    var courseName = req.query.courseName;
    if (!courseName) courseName = req.params.courseName;
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
    next();
  }).catch(next);
  },

  checkSignBelong: function checkSignBelong(req, res, next) {
    var coursename = req.params.courseName;
    var signname = req.params.signName;
    if ((!coursename) || (!signname)) {
      coursename = req.query.courseName;
      signname = req.query.signName;
    }
    console.log("coursename = " + coursename);
    console.log("signname = " + signname);
    Promise.all([
      SignModel.findSignByCourseAndSignName(coursename, signname),
    ])
      .then(function (result) {
        if (!result[0]) {
          req.flash('error', '该签到不存在');
          console.log('该签到不存在');
          return res.redirect('back');
        }
        next();
      })
      .catch(next);
  }
};