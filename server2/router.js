const express = require('express')
const router = express.Router()

router.get('/error', (req, res) => {
  res.statusCode = 500
  return res.end()
})

router.get('/JSONP', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  return res.end(
    `${req.query.callbackFn}(${statusCode},${JSON.stringify({
      callbackId: req.query.callbackId,
      msg
    })})`
  )
})

router.get('/SubHostProxy/proxyPage', (req, res) => {
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

const CORSHeader = {
  'Access-Control-Allow-Origin': 'http://demo.com',
  'Access-Control-Allow-Methods': ['POST', 'GET', 'OPTIONS'],
  'Access-Control-Allow-Headers': ['Content-Type']
}

router.options('/CORS', (req, res) => {
  for (const i of Object.keys(CORSHeader)) {
    res.setHeader(i, CORSHeader[i])
  }
  res.end()
})

router.get('/CORS', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const statusCode = '1'
  for (const i of Object.keys(CORSHeader)) {
    res.setHeader(i, CORSHeader[i])
  }
  return res.json({
    statusCode,
    data: { msg }
  })
})

router.post('/CORS', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  const statusCode = '1'
  for (const i of Object.keys(CORSHeader)) {
    res.setHeader(i, CORSHeader[i])
  }
  return res.json({
    statusCode,
    data: { msg }
  })
})

router.get('/CORS/error', (req, res) => {
  res.statusCode = 500
  for (const i of Object.keys(CORSHeader)) {
    res.setHeader(i, CORSHeader[i])
  }
  return res.end()
})

module.exports = router
