const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) { 
  app.use(createProxyMiddleware('/v1', {target: 'http://h5fs.com/', changeOrigin: true}))  
}  
