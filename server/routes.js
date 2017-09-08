const User = require('./controllers/User');
const Group = require('./controllers/Group');

const express = require('express');
const path = require('path');

const router = express.Router();


router.post('/user/signup', User.signup);
router.post('/user/google', User.google);
router.post('/user/signin', User.signin);
router.post('/user/signout', User.signout);
router.post('/user/reset/', User.resetPassword);

// Route for Creating Group
router.post('/group', Group.createGroup);

// Route for Adding User to A group
router.post('/group/groupName/user', Group.addUserToGroup);

// Create Message to a particular Group
router.post('/groupName/messages/notification/priority', Group.createMessage);

// Retrive Notifications from Database, we go into the User database
router.get('/user/notification/', User.notification);

// Retrive Users and Messages from a particular Group
router.get('/groups/:groupName', Group.usersAndMessagesInGroups);

 
// // Update a message when the user clicks inbox
// router.post('/user/inbox/:user', User.updateInbox);

// Update the message array with the users that have seen it 
// router.post('/seen/:groupName/:uid/:userName', User.seenMessage);

// Archive a message and store in the user database 
// router.post('/user/archive/messageId', User.messageArchive);

// // Add Notification to a particular Group
// router.post('/groups/:groupName/:notification', Group.notification);



// Retrive all Users from Database
router.get('/users/allusers/', User.allUsers);

// Retrive all Personal Message from Database
// router.get('/users/personalMessage/', User.personalMessage);

// Retrive all Phone Numbers from Database
router.get('/users/allnumbers/', User.allNumbers);



module.exports = router;
