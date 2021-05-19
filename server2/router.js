const express = require('express')
const router = express.Router()

router.get('/JSONP', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  return res.end(
    `${req.query.cbName}(${req.query.cbId},${JSON.stringify({
      msg
    })})`
  )
})

router.get('/SubHostProxy/proxyPage', (req, res) => {
  return res.render('SubHostProxyProxyPage.pug')
})

router.get('/SubHostProxy', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  return res.json({
    msg
  })
})

router.post('/SubHostProxy', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  return res.json({
    msg
  })
})

router.get('/MockForm', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  return res.render('MockFormCallbackPage.pug', {
    callbackFn: req.query.callbackFn,
    callbackId: req.query.callbackId,
    data: JSON.stringify({
      msg
    })
  })
})

router.post('/MockForm', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  return res.render('MockFormCallbackPage.pug', {
    callbackFn: req.body.callbackFn,
    callbackId: req.body.callbackId,
    data: JSON.stringify({
      msg
    })
  })
})

router.get('/WindowName', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  return res.render('WindowNameRedirectPage.pug', {
    redirect: req.query.redirect,
    data: JSON.stringify({
      msg
    })
  })
})

router.post('/WindowName', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  return res.render('WindowNameRedirectPage.pug', {
    redirect: req.body.redirect,
    data: JSON.stringify({
      msg
    })
  })
})

router.get('/WindowHash', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  return res.render('WindowHashWorkPage.pug', {
    refererUrl: req.query.refererUrl,
    data: JSON.stringify({
      callbackId: req.query.callbackId,
      msg
    })
  })
})

router.post('/WindowHash', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  return res.render('WindowHashWorkPage.pug', {
    refererUrl: req.body.refererUrl,
    data: JSON.stringify({
      callbackId: req.body.callbackId,
      msg
    })
  })
})

module.exports = router
