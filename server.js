const express = require('express')
const session = require('express-session')

const app = express()

app.set('trust proxy', 1)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))





















app.listen(3000)
