var express = require('express');
var xlsx = require('node-xlsx');
var router = express.Router();
var qr = require('qr-image');

var UserModel = require('../models/users');
var CourseModel = require('../models/courses');
var SignModel = require('../models/sign');
var checkLogin = require('../middlewares/check').checkLogin;


// home 主页信息
router.get('/', checkLogin, function(req, res, next) {
  var manager = req.session.user.name;

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

// 暂时不需要用到
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

// 课程详细信息
router.get('/:courseName', checkLogin, function(req, res, next) {
  var courseName = req.params.courseName;
  console.log("课程名称为:" + courseName);

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

    console.log("课程id为："+ course._id);
    var datas = [];
    var signs = [];  // 签到列表
    // 读取学生名单并写入datas
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
// 写入课程详细信息
/*
    res.render('myCourseDetail', {
      number: datas.length,
      datas: datas,
      course: course,
    });*/
    res.render('courseDetail', {
      number: datas.length,
      course: course,
      signs: signs,
    });

  })
  .catch(next);
});

// 修改学生名单
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

router.get('/:name/qrcode', function (req, res, next) {
  var course = req.params.name;
  res.render('qrcode', {
    title: 'Express',
    course: course
  });
});

router.get('/:name/create_qrcode', function (req, res, next) {
   var text = req.query.text;
    try {
        var img = qr.image(text,{size :10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
});



router.get('/:name/sign', function (req, res, next) {
  var course = req.params.name;
  res.render('sign', {
    course: course
  });
});

// POST /posts 签到记录
router.post('/:name/sign', function(req, res, next) {
  var course = req.params.name;
  var number = req.fields.number;
  var name = req.fields.name;

  // 校验参数
  try {
    if (!number.length) {
      throw new Error('请填写学号');
    }
    if (!name.length) {
      throw new Error('请填写姓名');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var post = {
    course: course,
    number: number,
    name: name
  };

  SignModel.create(post)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0];
      req.flash('success', '签到成功');
      res.redirect('back');
    })
    .catch(next);
});

module.exports = router;