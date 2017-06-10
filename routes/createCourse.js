var fs = require('fs');
var xlsx = require('node-xlsx');
var path = require('path');
var express = require('express');
var router = express.Router();


var CourseModel = require('../models/courses');
var StudentModel = require('../models/students');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /createCourse 创建课程
router.get('/', checkLogin, function(req, res, next) {
  res.render('./course/createCourse');
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
  // 将名单中的学生导入数据库
  var obj = xlsx.parse(req.files.StuList.path);
  var excelobj = obj[0].data;
  var data = [];
  for (var i in excelobj) {
    var arr = [];
    var value = excelobj[i];
    for (var j in value) {
      arr.push(value[j]);
      console.log("value["+i+"]["+j+"] = " + value[j]);
    }
    data.push(arr);
  }
  // 课程信息写入数据库
  CourseModel.create(course)
    .then(function (result) {
      // 此 course是插入 mongodb 后的值，包含 _id
      course = result.ops[0];
      // 写入 flash
      req.flash('success', '创建成功');
      // 跳转到首页
      res.redirect('/home');
      console.log("返回后这里执行了");
      var students = [];
      for (var i in data) {
        var student = {
          stdId: data[i][0].toString(),
          name: data[i][1].toString(),
          course: name.toString()
        };
        students.push(student);
      }
      StudentModel.insertMany(students)
        .then(function(result) {
        })
        .catch(function(e) {
          console.log(e);
          next();
        });

/*
   // 这种闭包写法也是可以的
      for (var i in data) {
        (function (i) {
          var student = {
            stdId: data[i][0].toString(),
            name: data[i][1].toString(),
            course: name.toString()
          };
        StudentModel.create(student)
          .then(function(result) {
            console.log("插入成功 = " + i);
          })
          .catch(function(e) {
            console.log("插入失败 = " + i);
            // if (e.message.match('E11000 duplicate key')) {
            //   console.log("已存在");
            // } else {
            //   console.log(e);
            // }
            console.log(e);
            next();
          });
        })(i);
      }
      */

    })
    .catch(function(e) {
      if (e.message.match('E11000 duplicate key')) {
        req.flash('error', '课程名已被占用');
        return res.redirect('createCourse');
      }
      next();
    });
    
});


module.exports = router;