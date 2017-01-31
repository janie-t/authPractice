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
  {userName: 'Jovey', password: 'Germanshepherdsrule', admin: false}
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


app.post('/login', function(req, res, next){

  req.session.userName = req.body.userName
  req.session.password = req.body.password

  const name = req.session.userName
  const password = req.session.password

  const user = _.find(users, { 'userName': name })

  if(!user) {
    return res.json({message: 'Have you registered yet?'})
  } else if( user.password === req.body.password ){
    res.json({message: 'Welcome. You are now logged in'})
  } else {
    return res.json({message: 'Do you need a password reminder?'})
  }
  //receive the form data
  //check the users table
  //compare the user name
    //if user name not exist
      //reply with no user name
    //if user name correct, check password
      //if name and password correct, send 'logged in'
      //if password incorrect send 'wrong password' message

})

app.get('/logout', function(req, res, next){
  res.send('You are logged out. Ka kite.')
})

app.get('/private', function(req, res, next){
  res.send('This is a private area. Restricted. Danger. Danger')
})


















app.listen(3000)
