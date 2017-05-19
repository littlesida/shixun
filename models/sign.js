var Sign = require('../lib/mongo').Sign;

module.exports = {

  create: function create(sign) {
    return Sign.create(sign).exec();
  },

  getSignByNumber: function getSignByNumber(number) {
    return Sign
      .findOne({ number: number })
      .addCreatedAt()
      .exec();
  },

  getSigns: function getSigns(course) {
    var query = {};
    if (course) {
      query.course = course;
    }
    return Sign
      .find(query)
      .sort({ _id: -1 })
      .addCreatedAt()
      .exec();
  }
};