var Sign = require('../lib/mongo').Sign;

module.exports = {

  create: function create(sign) {
    return Sign.create(sign).exec();
  },

  findSignByCourseAndSignName: function findSignByCourseAndSignName(course, sign) {
    return Sign
      .findOne({ courseName: course, signName: sign })
      .addCreatedAt()
      .exec();
  },

  getSigns: function getSigns(course) {
    var query = {};
    if (course) {
      query.courseName = course;
    }
    return Sign
      .find(query)
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec();
  }
};