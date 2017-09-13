import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/appAPI';

const CHANGE_EVENT = 'change';

let userStore = '';
let authenticate = false;
let contactsStore = [];
let currentGroupStore = '';
let messagesStore = [];
let groupsStore = [];
let groupUsersStore = [];
let databaseUsersStore = [];
let notificationStore = [];
let personalMessageStore = [];
let allUsersNumberStore = [];
let archiveMessageStore = [];
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
    loggedInUser.push(user.displayName);
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
    //loggedInUser.push(user.displayName);
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
  addUserToGroup(users) {
    groupUsersStore.push(users);
  },

  setGroupUsers(users) {
    groupUsersStore = users;
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

    case AppConstants.SAVE_GROUP_USER:
      AppStore.addUserToGroup(action.addUser);
      AppAPI.addUserToGroup(action.addUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SAVE_MESSAGE:
      AppStore.saveMessages(action.message);
      AppAPI.saveMessages(action.message);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_MESSAGE:
      AppStore.setMessages(action.message);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEEN_MESSAGE:
      AppAPI.seenMessage(action.user);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_SEEN_USERS:
      AppStore.setSeenUsers(action.users);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SIGN_IN:
      AppAPI.login(action.contact);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_LOGIN:
      AppStore.saveUser(action.user);
      AppStore.setAuth();
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.LOGOUT:
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('groupName');
      AppStore.setLogout();
      AppAPI.setLogout();
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE:
      AppStore.setGoogleSignup(action.googleUser);
      AppAPI.google(action.googleUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEARCH_USER_MESSAGE:
      AppStore.setCurrentGroup(action.keyName);
      AppAPI.searchUserMessageInGroup(action.keyName);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_USER:
      AppStore.setGroupUsers(action.users);
      AppStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.RESET_PASSWORD:
      AppAPI.resetPassword(action.email);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.NOTIFICATION:
      AppStore.saveNotification(action.notify);
      AppAPI.saveNotification(action.notify);
      AppStore.emit(CHANGE_EVENT);
      break;

    default:

  }

  return true;
});

module.exports = AppStore;
