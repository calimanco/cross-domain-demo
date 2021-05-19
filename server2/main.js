const express = require('express')
const router = require('./router')
const path = require('path')
// Server init.
const app = express()
const serverPort = 4000
app.set('views', path.join(__dirname, 'templates'))
app.engine('pug', require('pug').__express)
// Set middleware.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
// Server boot.
app.listen(serverPort, () => {
  console.log(
    `Server listening on http://localhost:${serverPort}, Ctrl+C to stop.`
  )
})
