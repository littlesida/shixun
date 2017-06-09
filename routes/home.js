var express = require('express');
var xlsx = require('node-xlsx');
var router = express.Router();
var qr = require('qr-image');

var UserModel = require('../models/users');
var CourseModel = require('../models/courses');
var SignModel = require('../models/sign');
var StudentModel = require('../models/students');
var SignDetailModel = require('../models/signDetail');
var checkLogin = require('../middlewares/check').checkLogin;
var checkCourseBelong = require('../middlewares/check').checkCourseBelong;
var checkSignBelong = require('../middlewares/check').checkSignBelong;


// home 主页信息
router.get('/', checkLogin, function (req, res, next) {
  var manager = req.session.user.name;
  console.log("home");
  Promise.all([
    UserModel.getUserByName(manager),// 获取用户信息
  ])
  .then(function (result) {
    var author = result[0];
    if (!author) {
      throw new Error('用户不存在');
    }
    // 用户存在，则获取该用户的所有课程
    CourseModel.getCourses(manager)
    .then(function (courses) {
      res.render('home', {
        author: author,
        courses: courses
      });
    })
    
  })
  .catch(next);
});

// 课程详细信息
router.get('/:courseName', checkLogin, checkCourseBelong, function (req, res, next) {
  var courseName = req.params.courseName;
  console.log("课程名称为:" + courseName);

  Promise.all([
    CourseModel.getCourseByName(courseName),// 获取课程信息
    SignModel.getSigns(courseName), // 获取签到列表
    StudentModel.getStudentByCoursename(courseName), // 读取学生
  ])
  .then(function (result) {
    var course = result[0]; 
    var signs = result[1];  // 签到列表
    var students = result[2];
    console.log("课程id为："+ course._id);
    

// 写入课程详细信息

    res.render('courseDetail', {
      number: students.length,
      course: course,
      signs: signs,
    });

  })
  .catch(next);
});


// 获取学生名单
router.get('/:courseName/stulist', checkLogin, checkCourseBelong, function (req, res, next) {
  var courseName = req.params.courseName;
  Promise.all([
    StudentModel.getStudentByCoursename(courseName),
    CourseModel.getCourseByName(courseName),// 获取课程信息
  ])
  .then(function (result) {
      var students = result[0];
      var course = result[1];
      console.log("students.length = " + students.length);
      console.log("course.length = " + course.length );
      res.render('studentList2', {
        number: students.length,
        datas: students,
        course: course,
      });
    })
    .catch(next);
  //res.render('studentList');
});



// 获取签到详情
router.get('/:courseName/:signName', checkLogin, checkCourseBelong, checkSignBelong, function (req, res, next) {
  console.log("进入签到详情: ", req.params.signName);
  var coursename = req.params.courseName;
  var signname = req.params.signName;
  var hadsigns = [];
  var notsigns = [];
  var errorsigns = [];
  var students = [];
  Promise.all([
    StudentModel.getStudentByCoursename(coursename),   // 读取学生名单
    SignDetailModel.getRightItemsByCourseAndSignName(coursename, signname),// 获取签到正确名单
    SignDetailModel.getErrorItemsByCourseAndSignName(coursename, signname), // 获取签到错误名单
  ])
  .then(function (result) {
    students = result[0];
    hadsigns = result[1];
    errorsigns = result[2];
    notsigns = students.filter(item => !hadsigns.map(item1 => item1.id).includes(item.stdId));
    res.render('signDetail', {
      coursename: req.params.courseName,
      signname: req.params.signName,
      hadSigns: hadsigns,
      notSigns: notsigns,
      errorSigns: errorsigns
    });
  })
  .catch(next);
  
});

router.get('/:courseName/:signName/qrcode', checkLogin, checkCourseBelong, checkSignBelong, function (req, res, next) {
  console.log('查看当前签到的二维码');
  var coursename = req.params.courseName;
  var signname = req.params.signName;
  res.render('qrcode2', {
    coursename: coursename,
    signname : signname
  });
});

module.exports = router;