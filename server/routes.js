const User = require('./controllers/User');
const Group = require('./controllers/Group');

const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

router.get('/er', (req, res) => {
  res.send('Welcome here');
});


// Sign Up
router.post('/user/signup', User.signup);

//Google Sign Up
router.post('/user/google', User.google);

// Sign In
router.post('/user/signin', User.signin);

// Sign Out
router.post('/user/signout', User.signout);

// Route for Creating Group
router.post('/group', Group.createGroup);

// Route for Adding User to A group
router.post('/group/:groupName/:user', Group.addUser);

// Retrive Groups from Database, we go into the User databse
router.get('/user/database/', User.database);

// Retrive Users from a particular Group
router.get('/group/:groupName', Group.database);

// Retrive Message from a particular Group
router.get('/groups/:groupName', Group.messageDatabase);

// Retrive all Users from Database
router.get('/users/allusers/', User.allUsers);

// Password Reset
router.post('/user/reset/', User.resetPassword);


module.exports = router;
