import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/appAPI';

const CHANGE_EVENT = 'change';

let userStore = '';
const localStorage = null; 
let authenticate = false;
let contactsStore = [];
let currentGroupStore = '';
let messagesStore = [];
let groupsStore = [];
let groupUsersStore = [];
let groupEmailStore = [];
let groupNumbersStore = [];
let databaseUsersStore = [];
let notificationStore = [];
let personalMessageStore = [];
let allUsersNumberStore = [];
let archiveMessageStore = [];
let openArchiveStore = 'inbox';
let seenUsersStore = [];
let googleSignUpStore = null;
const loggedInUser = [];

const AppStore = assign({}, EventEmitter.prototype, {

  getAuth() {
    return authenticate;
  },

  setAuth() {
    authenticate = true;
  },
  setLogout() {
    authenticate = false;
  },

  getLoggedInUser() {
    return loggedInUser;
  },

  getUser() {
    return userStore;
  },

  saveUser(user) {
    userStore = user;
    loggedInUser.push(user);
  },

  setUser(user) {
    userStore = user;
  },

  getContacts() {
    return contactsStore;
  },
  saveContact(contact) {
    contactsStore.push(contact);
  },

  setContacts(contacts) {
    contactsStore = contacts;
  },

  // Get All Users in the database
  getAllUsersNumber() {
    return allUsersNumberStore;
  },
  setAllUsersNumber(number) {
    allUsersNumberStore = number;
  },
  getdatabaseUsers() {
    return databaseUsersStore;
  },

  setdatabaseUsers(contacts) {
    databaseUsersStore = contacts;
  },

  // Get the Current User who signed up with Google
  getGoogleSignup() {
    return googleSignUpStore;
  },
  setGoogleSignup(googleUser) {
    googleSignUpStore = googleUser;
  },
  getGroups() {
    return groupsStore;
  },
  saveGroup(group) {
    groupsStore.push(group);
  },

  setGroups(groups) {
    groupsStore = groups;
  },

  // Get the Current Group When the User has Clicked on A Group
  getCurrentGroup() {
    return currentGroupStore;
  },

  setCurrentGroup(keyName) {
    currentGroupStore = keyName;
  },


  // Get Users in a Group
  getGroupUsers() {
    return groupUsersStore;
  },
  saveGroupUser(users) {
    groupUsersStore.push(users);
  },

  setGroupUsers(users) {
    groupUsersStore = users;
  },


  // Get Emails in a Group
  getGroupEmails() {
    return groupEmailStore;
  },

  setGroupEmails(emails) {
    groupEmailStore = emails;
  },

  // Get Numbers in a Group
  getGroupNumbers() {
    return groupNumbersStore;
  },

  setGroupNumbers(numbers) {
    groupNumbersStore = numbers;
  },


  // Get Messages
  getMessages() {
    return messagesStore;
  },
  saveMessages(message) {
    messagesStore.push(message);
  },
  setMessages(messages) {
    messagesStore = messages;
  },

  // Get Notification
  getNotification() {
    return notificationStore;
  },
  saveNotification(notify) {
    notificationStore.push(notify);
  },
  setNotification(notify) {
    notificationStore = notify;
  },

  // Get Personal Message
  getPersonalMessage() {
    return personalMessageStore;
  },
  savePersonalMessage(message) {
    personalMessageStore.push(message);
  },

  setPersonalMessage(message) {
    personalMessageStore = message;
  },
  removeMessage(messageId) {
    const index = personalMessageStore.findIndex(x => x.id === messageId);
    personalMessageStore.splice(index, 1);
  },

  // Get Archive Message
  getArchiveMessage() {
    return archiveMessageStore;
  },
  saveArchiveMessage(message) {
    archiveMessageStore.push(message);
  },

  setArchiveMessage(message) {
    archiveMessageStore = message;
  },

  // Get Archive Message
  getSeenUsers() {
    return seenUsersStore;
  },

  setSeenUsers(users) {
    seenUsersStore = users;
  },

  // Open and Close Archive link
  getOpenArchive() {
    return openArchiveStore;
  },
  openArchive() {
    openArchiveStore = 'archive';
  },
  closeArchive() {
    openArchiveStore = 'inbox';
  },
  openGroup() {
    openArchiveStore = 'group';
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case AppConstants.SAVE_CONTACT:
      AppStore.saveContact(action.contact);
      AppAPI.saveContact(action.contact);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_CONTACT:
      AppStore.setdatabaseUsers(action.contacts);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_ALLUSERS_NUMBER:
      AppStore.setAllUsersNumber(action.number);
      AppStore.emit(CHANGE_EVENT);
      break;


    case AppConstants.SAVE_GROUP:
      AppStore.saveGroup(action.group);
      AppAPI.saveGroup(action.group);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_GROUPS:
      AppStore.setGroups(action.groups);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_NOTIFICATION:
      AppStore.setNotification(action.notification);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_PERSONAL_MESSAGE:
      console.log('Receiving Personal Message...');
      // Store Save
      AppStore.setPersonalMessage(action.message);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SAVE_GROUP_USER:
      console.log('Saving user into group...');
      console.log(action.addUser)
      // Store Save
      AppStore.saveGroupUser(action.addUser);
      // //Save to API
      AppAPI.saveGroupUser(action.addUser);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SAVE_MESSAGE:
      console.log('Saving Message...');
      // // Store Save
      console.log(action.message)
      AppStore.saveMessages(action.message);
      // // Save to API
      AppAPI.saveMessages(action.message);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_MESSAGE:
      console.log('Receving Message...');
      // Store Save
      AppStore.setMessages(action.message);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.REMOVE_MESSAGE:
      console.log('Removing Message...');
      AppStore.saveArchiveMessage(action.messageId);
      AppStore.removeMessage(action.messageId.id);
      console.log(action.messageId);
      // AppAPI.removeMessage(action.messageId.uid);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.ARCHIVE_MESSAGE:
      console.log('Receving Archives...');
      AppStore.setArchiveMessage(action.message);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEEN_MESSAGE:
      console.log('User who have seen message..');

      AppAPI.seenMessage(action.user);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_SEEN_USERS:
      console.log('Receiving users who have seen message..');
      AppStore.setSeenUsers(action.users);
      console.log(action.users)
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.OPEN_ARCHIVE:
      console.log('Opening Archives...');
      AppStore.openArchive();
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.CLOSE_ARCHIVE:
      console.log('Closing Archives...');
      AppStore.closeArchive();
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.UPDATE_INBOX:
      console.log('Updating Inbox...');
      // AppAPI.updateInbox(action.user);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;


    case AppConstants.SIGN_IN:
      // Save to API
      AppAPI.login(action.contact);
      // //Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_LOGIN:
      // Store Save
      AppStore.saveUser(action.user);
      AppStore.setAuth();
      // localStorage.setItem()
      // //Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.LOGOUT:
    console.log('Logging Out')
      window.localStorage.removeItem('user');    
      AppStore.setLogout();
      // //Emit Change
      // Save to API
      AppAPI.setLogout();
      // //Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE:
      console.log('Google Signing Up...');
      AppStore.setGoogleSignup(action.googleUser);
      // //Save to API
      AppAPI.google(action.googleUser);
      // //Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE_LOGIN:
      console.log('Google LOGIN...');
      AppAPI.googleLogin(action.googleUser);
      // //Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEARCH_USER_MESSAGE:
      AppStore.setCurrentGroup(action.keyName);
      AppStore.openGroup();
      // Save to API
      AppAPI.searchUserMessage(action.keyName);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_USER:
      console.log('Receiving Users...');
      AppStore.setGroupUsers(action.users);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_EMAILS:
      AppStore.setGroupEmails(action.emails);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_NUMBERS:
      AppStore.setGroupNumbers(action.numbers);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

        
    case AppConstants.RESET_PASSWORD:
      console.log('Reseting Password...');
      // Save to API
      AppAPI.resetPassword(action.email);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.NOTIFICATION:
      console.log('Saving Notification...');
      // Store Save
      AppStore.saveNotification(action.notify);
      // Save to API
      AppAPI.saveNotification(action.notify);
      // Emit Change
      AppStore.emit(CHANGE_EVENT);
      break;

    default:

  }

  return true;
});

module.exports = AppStore;
