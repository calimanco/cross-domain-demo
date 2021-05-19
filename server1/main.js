const express = require('express')
const path = require('path')
// Server init.
const app = express()
const serverPort = 3000
const pagesDir = path.join(__dirname, 'pages')
const publicDir = path.join(__dirname, 'public')
// Set middleware.
app.use('/', express.static(pagesDir))
app.use('/', express.static(publicDir))
// Server boot.
app.listen(serverPort, () => {
  console.log(
    `Server listening on http://localhost:${serverPort}, Ctrl+C to stop.`
  )
})
