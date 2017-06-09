var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
var checkCourseBelong = require('../middlewares/check').checkCourseBelong;
var CourseModel = require('../models/courses');
var SignModel = require('../models/sign');

router.get('/', checkLogin, checkCourseBelong, function (req, res, next) {
  var courseName = req.query.courseName;
  console.log("course is "+courseName);
  res.render('createSign', {
    courseName : courseName
  });
});

router.post('/', checkLogin, checkCourseBelong, function(req, res, next) {
  var courseName = req.fields.courseName;
  var signName = req.fields.signName;
  console.log('课程名称为:' + courseName);
  console.log('签到名称为:' + signName);
  try {
    if (!(signName.length >=1 && signName.length <= 10)) {
      console.log('签到名称长度为:' + signName.length);
      throw new Error('签到名称请限制在 1-10 个字符');
    } 
  } catch(e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }
// 保存信息
var sign = {
  courseName: courseName,
  signName: signName
};
SignModel.create(sign)
  .then(function(result) {
      
      console.log('创建签到成功');
      req.flash('success', '创建签到成功');
      res.redirect('/home/'+courseName);
  })
  .catch(function (e) {
    if (e.message.match('E11000 duplicate key')) {
      req.flash('error', '该签到已存在');
      return res.redirect('back');
    }
    next(e);
  });
  //req.flash('error', '测试错误');
  //res.redirect('back');
});

module.exports = router;