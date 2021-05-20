const express = require('express')
const router = express.Router()

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

module.exports = router
