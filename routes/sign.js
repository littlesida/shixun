var express = require('express');
var router = express.Router();
var qr = require('qr-image');

var SignModel = require('../models/sign');
var SignDetailModel = require('../models/signDetail');
var StudentModel = require('../models/students');
var checkSignBelong = require('../middlewares/check').checkSignBelong;

router.get('/', checkSignBelong, function (req, res, next) {
  console.log('进入sign get');
  res.render('sign', {
    coursename: req.query.courseName,
    signname: req.query.signName
  });
});

router.post('/', checkSignBelong, function (req, res, next) {
  var id = req.fields.stdId;
  var name = req.fields.name;
  var coursename = req.query.courseName;
  var signname = req.query.signName;
  try {
    if (!id) {
      console.log("没有填写学号");
      throw new Error('没有填写学号');
    }
    if (!name) {
      console.log('没有填写姓名');
      throw new Error('没有填写姓名');
    }
  } catch(e) {
    req.flash('error', e.message);
    return res.redirect('sign?courseName='+coursename+'\&signName='+signname);
  }
  Promise.all([
    StudentModel.findStudentByIdAndCoursename(id, coursename),
  ])
    .then(function (result) {
      var student = result[0];
      var signDetail = {};
      signDetail.courseName = coursename;
      signDetail.signName = signname;
      signDetail.name = name.toString();
      signDetail.id = id.toString();
      if (!student) {
        console.log("该学生学号不在本课程");
        signDetail.state = false;
        req.flash('error', "该学生学号不在本课程");
      } else if (student.name != name) {
        req.flash('error', "姓名与学号不匹配");
        console.log("姓名与学号不匹配");
        signDetail.state = false;
      } else {
        req.flash('success', "签到成功");
        console.log("签到成功");
        signDetail.state = true;
      }
      SignDetailModel.create(signDetail)
        .then(function (result) {
          res.redirect('sign?courseName='+coursename+'\&signName='+signname);
        })
        .catch(function (e) {
          if (e.message.match('E11000 duplicate key')) {
            req.flash('error', '该学号已签到');
            return res.redirect('sign?courseName='+coursename+'\&signName='+signname);
          }
        });
      
    })
    .catch(next);
});

router.get('/create_qrcode', function (req, res, next) {
   var text = req.query.text;
   console.log("二维码的text = " + text);
    try {
        var img = qr.image(text,{size :10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
});


module.exports = router;