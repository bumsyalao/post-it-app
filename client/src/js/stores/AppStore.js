import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import assign from 'object-assign'
import AppAPI from '../utils/appAPI'

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

  getUser() {
    return userStore;
  },

  saveUser(user) {
    userStore = user;
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
    groupUsersStore.push(users)
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
    var index = personalMessageStore.findIndex(x => x.id === messageId);
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
    console.log('Saving Contact...');
    // Store Save
    AppStore.saveContact(action.contact);
    // Save to API
    AppAPI.saveContact(action.contact);
    // Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_CONTACT:
    console.log('Receiving Contact...');
    // Store Save
    AppStore.setdatabaseUsers(action.contacts);
    // Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_ALLUSERS_NUMBER:
    console.log('Receiving all the numbers in a the database...');
    // Store Save
    AppStore.setAllUsersNumber(action.number);
    // Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;


  case AppConstants.SAVE_GROUP:
    console.log('Saving group...');
    // Store Save
    AppStore.saveGroup(action.group);
    // Save to API
    AppAPI.saveGroup(action.group);
    // Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_GROUPS: 
    console.log('Receiving Groups...');
    // Store SaveS
    AppStore.setGroups(action.groups);
    // Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_NOTIFICATION:
    console.log('Receiving NOTIFICATION...');
    // Store Save
    AppStore.setNotification(action.notification);
    // Emit Change
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
    // //Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.LOGOUT:
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
    console.log('Searching for Users and Message...');
    AppStore.setCurrentGroup(action.keyName);
    AppStore.openGroup();
    // Save to API
    AppAPI.searchUserMessage(action.keyName);
    // Save to API
    // AppAPI.getMessages(action.keyName); 
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
    console.log('Receiving Emails in a group...');
    AppStore.setGroupEmails(action.emails);
    // Emit Change
    AppStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.RECEIVE_NUMBERS:
    console.log('Receiving Numbers in a group...');
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
