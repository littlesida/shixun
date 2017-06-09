var SignDetail = require('../lib/mongo').SignDetail;


module.exports = {
    create: function create(signDetail) {
    return SignDetail.create(signDetail).exec();
  },
  getRightItemsByCourseAndSignName: function getRightItemsByCourseAndSignName(course, sign) {
    var query = {};
    query.courseName = course;
    query.signName = sign;
    query.state = true;
    return SignDetail
      .find(query)
      .sort({_id: -1})
      .addCreatedAt()
      .exec();
  },
  getErrorItemsByCourseAndSignName: function getErrorItemsByCourseAndSignName(course, sign) {
    var query = {};
    query.courseName = course;
    query.signName = sign;
    query.state = false;
    return SignDetail
      .find(query)
      .sort({_id: -1})
      .addCreatedAt()
      .exec();
  }
};