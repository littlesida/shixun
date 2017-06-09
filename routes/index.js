module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/home');
    });
    app.use('/signup', require('./signup'));   // 注册
    app.use('/signin', require('./signin'));  // 登录
    app.use('/signout', require('./signout'));  // 登出
    app.use('/posts', require('./posts'));
    app.use('/home', require('./home'));   // 主页
    app.use('/createCourse', require('./createCourse'));  // 创建课程
    app.use('/createSign', require('./createSign')); // 创建签到
    // 404 page
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
