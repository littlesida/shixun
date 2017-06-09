var express = require('express');
var router = express.Router();
var qr = require('qr-image');


var checkSignBelong = require('../middlewares/check').checkSignBelong;

router.get('/', checkSignBelong, function (req, res, next) {
  res.render('sign');
});

router.get('/create_qrcode', function (req, res, next) {
   var text = req.query.text;
   console.log("二维码的text = " + text);
    try {
        var img = qr.image(text,{size :10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
});


module.exports = router;