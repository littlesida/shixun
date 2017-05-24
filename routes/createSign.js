var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;
var checkBelong = require('../middlewares/check').checkBelong;
var CourseModel = require('../models/courses');

router.get('/', checkBelong, function (req, res, next) {
  var courseName = req.query.courseName;
  console.log("course is "+courseName);
  res.render('createSign', {
    courseName : courseName
  });
});

router.post('/', checkBelong, function(req, res, next) {
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

  req.flash('error', '测试错误');
  res.redirect('back');
});

module.exports = router;