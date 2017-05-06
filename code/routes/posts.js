var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

var checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 用户所有签到记录
//   eg: GET /posts?author=xxx
router.get('/', function(req, res, next) {
  //var author = req.query.author;
  var author = req.session.user._id;

  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      });
    })
    .catch(next);

});

// POST /posts 签到记录
router.post('/', checkLogin, function(req, res, next) {
  var author = req.session.user._id;
  var title = req.fields.title;
  var name = req.fields.name;
  var sit = req.fields.sit;

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写学号');
    }
    if (!name.length) {
      throw new Error('请填写姓名');
    }
    if (!sit.length) {
      throw new Error('请填写座位号');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var post = {
    author: author,
    title: title,
    name: name,
    sit: sit,
  };

  PostModel.create(post)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0];
      req.flash('success', '发表成功');
      // 发表成功后跳转到该签到记录
      res.redirect(`/posts/${post._id}`);
    })
    .catch(next);
});

// GET /posts/create 签到页
router.get('/create', checkLogin, function(req, res, next) {
  res.render('create');
});

// GET /posts/:postId 单独的签到记录
router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;

  Promise.all([
    PostModel.getPostById(postId),// 获取签到信息
  ])
  .then(function (result) {
    var post = result[0];
    if (!post) {
      throw new Error('该签到记录不存在');
    }

    res.render('post', {
      post: post,
    });
  })
  .catch(next);
});

module.exports = router;
