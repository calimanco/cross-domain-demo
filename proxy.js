const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer({})

const server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  const { headers, method, url } = req
  console.log('Proxy evoke', headers.host, method, url)
  // Proxy to demo.com
  if (headers.host.match(/^demo\.com$/i)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:3000' }, error => {
      console.error(error.message)
      res.statusCode = 504
      res.end()
    })
    return
  }
  // Proxy to api.demo.com
  if (headers.host.match(/^api\.demo\.com$/i)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:4000' }, error => {
      console.error(error.message)
      res.statusCode = 504
      res.end()
    })
    return
  }
  res.statusCode = 404
  res.end()
})

console.log('Proxy start')
server.listen(80)
