var Student = require('../lib/mongo').Student;

module.exports = {
  // 注册一个用户
  create: function create(student) {
    return Student.create(student).exec();
  },

  // 通过用户名获取用户信息
  getStudentByName: function getStudentByName(name) {
    return Student
      .findOne({ name: name })
      .addCreatedAt()
      .exec();
  }
};