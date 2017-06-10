const express = require('express')
const router = express.Router()
const passwordHash = require('password-hash')

router.get('/', function(req, res) {
  if (req.session.login) {
    res.locals.data = req.session.data;
    res.render('account/index')
  } else {
    res.redirect('/account/login')
  }
})

router.get('/login', function(req, res) {
  res.render('account/login')
})

router.post('/login', function(req, res) {
  const userCollection = db.collection('users')
  const loginName = req.body.username
  const loginPassword = req.body.password
  userCollection.findOne({
    username: loginName
  }, function(err, user) {
    if (user) {
      const passwordCheck = passwordHash.verify(loginPassword, user['password']);
      if (passwordCheck === true) {
        req.session.login = true;
        req.session.data = user;
        res.redirect('/account/');
      }
    } else {
      res.render('account/login')
    }
  });
})

router.get('/register', function(req, res) {
  res.render('account/register')
})

router.post('/register', function(req, res) {
  const userCollection = db.collection('users')
  const registerName = req.body.username
  const registerPassword = passwordHash.generate(req.body.password)
  const registerData = {
    username: registerName,
    password: registerPassword
  }
  userCollection.findOne({
    username: registerName
  }, function(err, user) {
    if (user) {
      console.log('Username bestaat al')
      res.locals.message = "De gekozen gebruikersnaam bestaat al"
      res.render('account/register')
    } else {
      userCollection.save(registerData, (error, result) => {
        if (err) return console.log(err)
        res.redirect('/account/login')
      })
    }
  })
})

router.post('/update', function(req, res) {
  const userCollection = db.collection('users')
  const type = req.body.type
  const boxId = req.body.boxId
  const color = req.body.color

  // otherwise the values are only updated when a user logs in again
  req.session.data.type = type
  req.session.data.boxId = boxId
  req.session.data.color = color

  const updateData = {
    type: type,
    boxId: boxId,
    color: color
  }
  userCollection.findOne({
    username: req.session.data.username
  }, function(err, user) {
    userCollection.updateOne(user, {$set: updateData}, (error, result) => {
      if (err) return console.log(err)
      res.redirect('/account')
    })
  })
})

router.get('/logout', function(req, res) {
  req.session.data = '';
  req.session.login = false;
  res.redirect('/');
})

module.exports = router