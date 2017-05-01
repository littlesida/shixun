module.exports = {
  port: 3000,
  session: {
    secret: 'signin',
    key: 'signin',
    maxAge: 3600
  },
  mongodb: 'mongodb://localhost:27017/test'
};
