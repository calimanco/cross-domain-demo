const express = require('express')
const router = express.Router()

const webOrigin = 'http://demo.com'

router.get('/error', (req, res) => {
  res.statusCode = 500
  return res.end()
})

router.get('/JSONP', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/javascript')
  res.setHeader('cache-control', 'no-store')
  return res.end(
    `${req.query.callbackFn}(${statusCode},${JSON.stringify({
      callbackId: req.query.callbackId,
      msg
    })})`
  )
})

router.get('/SubHostProxy/proxyPage', (req, res) => {
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'public,max-age=604800')
  return res.render('SubHostProxyProxyPage.pug')
})

router.get('/SubHostProxy', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  return res.json({
    statusCode,
    data: { msg }
  })
})

router.post('/SubHostProxy', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  return res.json({
    statusCode,
    data: { msg }
  })
})

router.get('/MockForm', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'no-store')
  return res.render('MockFormCallbackPage.pug', {
    statusCode,
    callbackFn: req.query.callbackFn,
    data: {
      callbackId: req.query.callbackId,
      msg
    }
  })
})

router.post('/MockForm', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'no-store')
  return res.render('MockFormCallbackPage.pug', {
    statusCode,
    callbackFn: req.body.callbackFn,
    data: {
      callbackId: req.body.callbackId,
      msg
    }
  })
})

router.get('/WindowName', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'no-store')
  return res.render('WindowNameRedirectPage.pug', {
    redirect: req.query.redirect,
    res: {
      statusCode,
      data: {
        callbackId: req.query.callbackId,
        msg
      }
    }
  })
})

router.post('/WindowName', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'no-store')
  return res.render('WindowNameRedirectPage.pug', {
    redirect: req.body.redirect,
    res: {
      statusCode,
      data: {
        callbackId: req.body.callbackId,
        msg
      }
    }
  })
})

router.get('/WindowHash', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'no-store')
  return res.render('WindowHashWorkPage.pug', {
    refererUrl: req.query.refererUrl,
    res: {
      statusCode,
      data: {
        callbackId: req.query.callbackId,
        msg
      }
    }
  })
})

router.post('/WindowHash', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'no-store')
  return res.render('WindowHashWorkPage.pug', {
    refererUrl: req.body.refererUrl,
    res: {
      statusCode,
      data: {
        callbackId: req.body.callbackId,
        msg
      }
    }
  })
})

router.get('/PostMessage/proxyPage', (req, res) => {
  res.setHeader('content-type', 'text/html')
  res.setHeader('cache-control', 'public,max-age=604800')
  return res.render('PostMessageProxyPage.pug')
})

router.get('/PostMessage', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  return res.json({
    statusCode,
    data: { msg }
  })
})

router.post('/PostMessage', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  return res.json({
    statusCode,
    data: { msg }
  })
})

const preflightHeader = {
  'Access-Control-Allow-Origin': webOrigin,
  'Access-Control-Allow-Methods': ['POST', 'GET', 'OPTIONS'],
  'Access-Control-Allow-Headers': ['Content-Type', 'token'],
  Vary: 'Origin'
}

const normalHeader = {
  'Access-Control-Allow-Origin': webOrigin,
  Vary: 'Origin'
}

router.options('/CORS', (req, res) => {
  const { origin } = req.headers
  if (origin === webOrigin) {
    for (const i of Object.keys(preflightHeader)) {
      res.setHeader(i, preflightHeader[i])
    }
    res.end()
  } else {
    res.statusCode = 403
    res.end()
  }
})

router.get('/CORS', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  const { origin } = req.headers
  if (origin === webOrigin) {
    for (const i of Object.keys(normalHeader)) {
      res.setHeader(i, normalHeader[i])
    }
    return res.json({
      statusCode,
      data: { msg }
    })
  } else {
    res.statusCode = 403
    res.end()
  }
})

router.post('/CORS', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  const { origin } = req.headers
  if (origin === webOrigin) {
    for (const i of Object.keys(normalHeader)) {
      res.setHeader(i, normalHeader[i])
    }
    return res.json({
      statusCode,
      data: { msg }
    })
  } else {
    res.statusCode = 403
    res.end()
  }
})

router.get('/CORS/error', (req, res) => {
  res.statusCode = 500
  for (const i of Object.keys(normalHeader)) {
    res.setHeader(i, normalHeader[i])
  }
  return res.end()
})

module.exports = router
