var marked = require('marked');
var Post = require('../lib/mongo').Post;

module.exports = {
  // 创建一条签到记录
  create: function create(post) {
    return Post.create(post).exec();
  },

  // 通过id获取签到记录
  getPostById: function getPostById(postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .addCreatedAt()
      .exec();
  },

  // 按创建时间降序获取用户的所有签到记录
  getPosts: function getPosts(author) {
    var query = {};
    if (author) {
      query.author = author;
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec();
  },

  // 通过 id 获取签到记录
  getRawPostById: function getRawPostById(postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .exec();
  }
};