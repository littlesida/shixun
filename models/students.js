var Student = require('../lib/mongo').Student;

module.exports = {
  // 注册一个用户
  create: function create(student) {
    console.log("student.stdId = " + student.stdId);
    console.log("student.name = " + student.name);
    console.log("student.course = " + student.course);
    return Student.create(student).exec();
  },

  insertMany: function insertMany(students) {
    return Student.insertMany(students).exec();
  },

  // 通过课程名称获取学生列表
  getStudentByCoursename: function getStudentByCoursename(coursename) {
    var query = {};
    if (coursename) {
      console.log("获取学生名单时coursename = " + coursename);
      query.course = coursename;
    } else {
      console.log("获取学生名单时coursename不存在");
    }
    return Student
      .find(query)
      .sort({_id: -1 })
      .addCreatedAt()
      .exec();
  },
  // 查找学生是否在课程中
  findStudentByIdAndCoursename: function findStudentByIdAndCoursename(id, coursename) {
    return Student
      .findOne({stdId : id, course: coursename})
      .addCreatedAt()
      .exec();
  }
};