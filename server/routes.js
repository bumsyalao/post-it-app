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

// Retrive Users and Email from a particular Group
router.get('/group/:groupName', Group.database);

// Add Message to a particular Group
router.post('/groups/:groupName/:messages/:emails/:numbers/:allUsers/:notification', Group.addMessage);

// // Add Notification to a particular Group
// router.post('/groups/:groupName/:notification', Group.notification);

// Retrive Message from a particular Group
router.get('/groups/:groupName', Group.messageDatabase);

// Retrive all Users from Database
router.get('/users/allusers/', User.allUsers);

// Password Reset
router.post('/user/reset/', User.resetPassword);

// Nodemailer
router.post('/user/mailer/', Group.mailer);

// Nexmo
router.post('/user/sms/', Group.sms);


module.exports = router;
