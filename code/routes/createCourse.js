var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var CourseModel = require('../models/courses');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /createCourse 创建课程
router.get('/', checkLogin, function(req, res, next) {
  res.render('createCourse');
});


router.post('/', checkLogin, function(req, res, next) {
  var name = req.fields.name;
  var bio = req.fields.bio;
  var stulist= req.files.StuList.path.split(path.sep).pop();
  var manager = req.session.user.name;

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符');
    }
    if (!(bio.length >= 1 && bio.length <= 100)) {
      throw new Error('课程简介请限制在 1-100 个字符');
    }
    if (!req.files.StuList.name) {
      throw new Error('缺少学生名单');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  // 待写入数据库的课程信息
  var course = {
    name: name,
    manager: manager,
    bio: bio,
    stulist: stulist
  };
  // 课程信息写入数据库
  CourseModel.create(course)
    .then(function (result) {
      // 此 course是插入 mongodb 后的值，包含 _id
      course = result.ops[0];
      // 写入 flash
      req.flash('success', '创建成功');
      // 跳转到首页
      res.redirect('/home');
    })
    .catch(next);
});


module.exports = router;
