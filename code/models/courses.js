var Course = require('../lib/mongo').Course;

module.exports = {
  // 创建一个课程
  create: function create(course) {
    return Course.create(course).exec();
  },
    // 通过用户名获取用户信息
  getCourseByManager: function getCourseByManager(name) {
    return Course
      .findOne({ name: name })
      .addCreatedAt()
      .exec();
  }
};
