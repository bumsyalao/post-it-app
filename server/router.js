import express from 'express';
import User from './controllers/User';
import Group from './controllers/Group';
import Message from './controllers/Message';
import Validate from './helpers/Validate';

const router = express.Router();

router.post('/user/signup', Validate.validateSignUp, User.signup);
router.post('/user/signin', Validate.validateSignIn, User.signin);
router.post('/google/signup', Validate.validateGoogleSignUp, User.googleSignup);
router.post('/user/signout', User.signout);
router.post('/user/reset/', User.resetPassword);
router.post('/group', Validate.createGroup, Group.createGroup);
router.post('/group/groupName/user', Validate.addUserToGroup,
Group.addUserToGroup);
router.post('/group/user/message/', Validate.createMessage,
Message.createMessage);
router.get('/group/:userName', Group.getGroups);
router.get('/user/notification/:user', User.getNotification);
router.get('/groups/:groupName/:user', Group.getUsersMessagesInGroups);
router.get('/users/allusers/', User.getAllUsers);
router.get('/users/allnumbers/', User.getAllNumbers);
router.get('/users/allemails/', User.getAllEmails);
router.get('/seen/:groupName/:messageID', Message.getReadMessageUsers);

module.exports = router;
