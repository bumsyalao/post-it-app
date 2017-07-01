const User = require('./controllers/User');
const Group = require('./controllers/Group');

const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

router.get('/er', (req, res) => {
  res.send("Welcome here");
});


// Sign Up
router.post('/user/signup', User.signup);

// Google Signup
router.get('/user/google', User.google);

// Sign In
router.post('/user/signin', User.signin);

// Sign Out
router.post('/user/signout', User.signout);

// Retrive Users from Database
router.get('/user/database', User.database);

// Route for creating Group
router.post('/group', Group.createGroup);

router.post('/group/:groupID/:uid', Group.addUser);

// Retrive Groups from Database
router.get('/group/database', Group.database);

// Route To add a Message
router.post('/messages/:groupID/:user/:text', Group.messages)

// Retrive Message from Database
router.get('/messages/:groupID/messages', Group.messageDatabase)


module.exports = router;
