var express = require('express');
var xlsx = require('node-xlsx');
var router = express.Router();

var UserModel = require('../models/users');
var CourseModel = require('../models/courses');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
  var manager = req.session.user.name;

  Promise.all([
    UserModel.getUserByName(manager),// 获取签到信息
  ])
  .then(function (result) {
    var author = result[0];
    if (!author) {
      throw new Error('用户不存在');
    }
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


router.get('/myCourse', checkLogin, function(req, res, next) {
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

  //console.log("我的数据" + datas[0][0]);

  Promise.all([
    CourseModel.getCourseByName(name),// 获取签到信息
  ])
  .then(function (result) {
    var course = result[0];
    if (!course) {
      throw new Error('该课程不存在');
    }

    var datas = [];

    var obj = xlsx.parse('./public/img/' + course.stulist);
    var excelObj=obj[0].data;
    for(var i in excelObj){
      var arr = [];
      var value=excelObj[i];
      for(var j in value){
        arr.push(value[j]);
      }
      datas.push(arr);
    }

    res.render('myCourseDetail', {
      number: datas.length,
      datas: datas,
      course: course,
    });
  })
  .catch(next);
});

router.get('/:name/edit', function(req, res, next) {
  res.render('editStudent');
});

/*router.post('/:name/edit', checkLogin, function(req, res, next) {
  var courseName = req.params.name;
  var addName = req.fields.addName;
  var addNumber = req.fields.addNumber;
  var deleteName = req.fields.deleteName;

  // 校验参数
  try {
    if (!addNumber.length) {
      throw new Error('请填写学号');
    }
    if (!addName.length) {
      throw new Error('请填写姓名');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

});*/

module.exports = router;