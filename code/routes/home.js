var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
  res.render('home', {
    pagetitle: "个人主页"
  });
});

module.exports = router;