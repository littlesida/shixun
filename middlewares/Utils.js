module.exports = {
 getClientIp: function getClientIp(req) {
        // return req.headers['x-forwarded-for'] ||
        // req.connection.remoteAddress ||
        // req.socket.remoteAddress ||
        // req.connection.socket.remoteAddress;
        var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
        console.log("在Util中ip为：" + ip);
        if(ip.split(',').length>0){
             ip = ip.split(',')[0];
        }
        return ip;
    }
};
