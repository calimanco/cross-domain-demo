const http = require('http')
const httpProxy = require('http-proxy')

//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({})

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
const server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log('Proxy evoke', req.headers.host)
  if (req.headers.host.match(/^demo\.com$/i)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:3000' })
  }
  if (req.headers.host.match(/^api\.demo\.com$/i)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:4000' })
  }
})

console.log('Proxy start')
server.listen(80)
