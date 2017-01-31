const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const _ = require('lodash')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('trust proxy', 1)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


const users = [
  {userName: 'Roxy', password: 'Dogsforlife', isAdmin: true},
  {userName: 'Jovey', password: 'Germanshepherdsrule', isAdmin: false}
]



app.get('/', function(req, res){
  res.send('Kia ora. Welcome. TalofaLava.')
})


app.get('/login', function(req, res, next){

  const options = {
    root: __dirname + '/'
  }

  res.sendFile('form.html', options, function(err){
    if(err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Form file sent');
    }
  })
})

function isAuthenticated(req, res, next){
  console.log('req.session', req.session);
  if(req.session.isAuthenticated === true){
    next()
  } else {
    res.redirect('/login')
  }
}

function isAdmin(req, res, next){
  if(req.session.isAdmin === true){
    next()
  } else {
    res.json({message: 'Sorry, computer says NO'})
  }
}

app.post('/login', function(req, res, next){
  req.session.userName = req.body.userName
  req.session.password = req.body.password

  const name = req.session.userName
  const password = req.session.password

  const user = _.find(users, { 'userName': name })

  if(!user) {
    return res.json({message: 'Have you registered yet?'})
  } else if( user.password === req.body.password ){
    req.session.isAuthenticated = true
    req.session.isAdmin = user.isAdmin
    res.json({message: 'Welcome. You are now logged in'})
  } else {
    return res.json({message: 'Do you need a password reminder?'})
  }

})



app.get('/logout', function(req, res, next){
  res.send('You are logged out. Ka kite.')
})


app.get('/private', isAuthenticated, function(req, res, next){
  res.send('Hello there')
})


app.get('/admin', isAdmin, function(req, res, next){
  res.send('You are the boss dog')
})















app.listen(3000)
