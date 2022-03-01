//! 通过 http-proxy-middleware 插件来实现反向代理 

const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/ajax',{
        target: 'https://m.maoyan.com',
        changeOrigin: true,
        // pathRewrite: {}  这个选项看你的标识符如何起了
    }))
    app.use(createProxyMiddleware('/api',{
        // http://www.qinqin.net/index.php?r=class/category&type=1
        target: 'http://www.qinqin.net',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }  //这个选项看你的标识符如何起了
    }))
}