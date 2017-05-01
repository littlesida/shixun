module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'not login');
      return res.redirect('/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', 'had login');
      return res.redirect('home'); // 返回之前的页面
    }
    next();
  }
}