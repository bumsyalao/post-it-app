const User = require('./controllers/User');
const Group = require('./controllers/Group');

const express = require('express');
const path = require('path');

const router = express.Router();


// Sign Up
router.post('/user/signup', User.signup);

// // Google Sign Up
// router.post('/user/google', User.google);

// // Google Login
// router.post('/google/login', User.googleLogin);

// Sign In
router.post('/user/signin', User.signin);

// Sign Out
router.post('/user/signout', User.signout);

// Route for Creating Group
router.post('/group', Group.createGroup);

// // Route for Adding User to A group
router.post('/group/groupKey/userKey', Group.addUserToGroup);


// // Retrive Groups from Database, we go into the User database
router.get('/user/groups', User.userGroups);

 // Retrive Users from a Group
router.get('/groups/user', Group.allUserInAGroup);

// // Retrive Notifications from Database, we go into the User database
// router.get('/user/notification/', User.notification);


// // Retrive Users and Email from a particular Group
// router.get('/group/:groupName', Group.database);

// Add Message to a particular Group
router.post('/groups/groupKey/messages/emails/numbers/allUsers/notification/priority/userKeys/groupName', Group.createMessage);

// // // Update a message when the user clicks inbox
// // router.post('/user/inbox/:user', User.updateInbox);

// // Update the message array with the users that have seen it
// router.post('/seen/:groupName/:uid/:userName', User.seenMessage);

// // Archive a message and store in the user database
// router.post('/user/archive/:messageId', User.messageArchive);
// // // Add Notification to a particular Group
// // router.post('/groups/:groupName/:notification', Group.notification);

// // Retrive Message from a particular Group
// router.get('/groups/:groupName', Group.messageDatabase);

// // Retrive all Users from Database
// router.get('/users/allusers/', User.allUsers);

// // Retrive all Personal Message from Database
// router.get('/users/personalMessage/', User.personalMessage);

// // Retrive all Phone Numbers from Database
// router.get('/users/allnumbers/', User.allNumbers);

// Password Reset
router.post('/user/reset/', User.resetPassword);

module.exports = router;
