var Course = require('../lib/mongo').Course;

module.exports = {
  // 创建一个课程
  create: function create(course) {
    return Course.create(course).exec();
  },

    // 通过课程名获取课程信息
  getCourseByName: function getCourseByName(name) {
    return Course
      .findOne({ name: name })
      .addCreatedAt()
      .exec();
  },

// 获取用户的所有课程
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

// 获取某课程的名单
  getListByCourse: function getListByCourse(course) {
    return Course
      .findOne({ stulist: course })
      .addCreatedAt()
      .exec();
  }
};
