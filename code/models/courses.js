var Course = require('../lib/mongo').Course;

module.exports = {
  // 创建一个课程
  create: function create(course) {
    return Course.create(course).exec();
  },
    // 通过用户名获取用户信息
  getCourseByName: function getCourseByName(name) {
    return Course
      .findOne({ name: name })
      .addCreatedAt()
      .exec();
  },

  getCourses: function getCourses(manager) {
    var query = {};
    if (manager) {
      query.manager = manager;
    }
    return Course
      .find(query)
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec();
  },
};
