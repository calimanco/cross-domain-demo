const express = require('express')
const router = express.Router()

router.get('/JSONP', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  const errMsg = ''
  return res.end(
    `${req.query.callbackFn}(${req.query.callbackId},${JSON.stringify({
      msg
    })}, '${errMsg}')`
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

router.get('/PostMessage/proxyPage', (req, res) => {
  return res.render('PostMessageProxyPage.pug')
})

router.get('/PostMessage', (req, res) => {
  const msg = `Your request message is ${req.query.message}`
  return res.json({
    msg
  })
})

router.post('/PostMessage', (req, res) => {
  const msg = `Your request message is ${req.body.message}`
  return res.json({
    msg
  })
})

module.exports = router
