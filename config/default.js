module.exports = {
  port: 3000,
  session: {
    secret: 'signin',
    key: 'signin',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
};