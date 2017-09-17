const User = require('./controllers/User');
const Group = require('./controllers/Group');
const Message = require('./controllers/Message');
const express = require('express');

const router = express.Router();
router.post('/user/signup', User.signup);
router.post('/user/signin', User.signin);
router.post('/user/signout', User.signout);
router.post('/user/reset/', User.resetPassword);
router.post('/group', Group.createGroup);
router.post('/group/groupName/user', Group.addUserToGroup);
router.post('/group/user/message/notification/priority', Message.createMessage);
router.get('/group/:userName', Group.getGroups);
router.get('/user/notification/', User.notification);
router.get('/groups/:groupName/:user', Group.usersAndMessagesInGroups);
router.get('/users/allusers/', User.allUsers);
router.get('/users/allnumbers/', User.allNumbers);
router.get('/users/allemails/', User.allEmails);
router.get('/groups/:groupName/:messageID/', Message.seenMessage);

module.exports = router;
