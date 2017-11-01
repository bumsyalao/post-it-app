import { EventEmitter } from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';

const CHANGE_EVENT = 'change';

let userStore = '';
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
let seenUsersStore = [];
let googleSignUpStore = null;
const loggedInUser = [];
const loggedInPicture = [];
let allEmails = [];

const AppStore = assign({}, EventEmitter.prototype, {


/**
 * @description This method logs the user into the app
 *
 * @method getAuthenticatedState
 *
 * @memberof AppStore
 *
 * @returns { Boolean } returns a bool
 */
  getAuthenticatedState() {
    return authenticate;
  },

  /**
 * @description This sets the authentication state to true
 *
 * @method setAuthenticatedState
 *
 * @memberof AppStore
 *
 * @returns { Boolean } returns True
 */
  setAuthenticatedState() {
    authenticate = true;
  },

  /**
 * @description This logs the user out of the app
 *
 * @method setAuthenticatedState
 *
 * @memberof AppStore
 *
 * @returns { Boolean } returns False
 */
  setLogout() {
    authenticate = false;
  },

  
  getLoggedInUser() {
    return loggedInUser;
  },

  getLoggedInPicture() {
    return loggedInPicture;
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

  setContacts(contacts) {
    contactsStore = contacts;
  },

  getAllUsersNumber() {
    return allUsersNumberStore;
  },

  setAllUsersNumber(numbers) {
    allUsersNumberStore = numbers;
  },

  getDatabaseUsers() {
    return databaseUsersStore;
  },

  setDatabaseUsers(users) {
    databaseUsersStore = users;
  },

  getAllEmails() {
    return allEmails;
  },

  setEmails(emails) {
    allEmails = emails;
  },

  getGoogleSignup() {
    return googleSignUpStore;
  },

  setGoogleSignIn(googleUser) {
    loggedInPicture.push(googleUser.photoURL);
    googleSignUpStore = googleUser;
  },

  getGroups() {
    return groupsStore;
  },

  setGroups(groups) {
    groupsStore = groups;
  },

  getCurrentGroup() {
    return currentGroupStore;
  },

  setCurrentGroup(group) {
    currentGroupStore = group;
  },

/**
 * @description This returns an array of users and messages in a group
 *
 * @method getGroupUsers
 *
 * @memberof AppStore
 *
 * @returns { Array } Returns an array of group messages
 */
  getGroupUsers() {
    return groupUsersStore;
  },


/**
 * @description This push 
 *
 * @method getGroupUsers
 *
 * @memberof AppStore
 *
 * @returns { Array } Returns an array of group messages
 */

  setGroupUsers(users) {
    groupUsersStore = users;
  },

  getGroupEmails() {
    return groupEmailStore;
  },

  setGroupEmails(emails) {
    groupEmailStore = emails;
  },

  getGroupNumbers() {
    return groupNumbersStore;
  },

  setGroupNumbers(numbers) {
    groupNumbersStore = numbers;
  },

  getMessages() {
    return messagesStore;
  },

  saveMessages(message) {
    messagesStore.push(message);
  },

  setMessages(messages) {
    messagesStore = messages;
  },

  getNotification() {
    return notificationStore;
  },

  setNotification(notify) {
    notificationStore = notify;
  },

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

  getArchiveMessage() {
    return archiveMessageStore;
  },

  saveArchiveMessage(message) {
    archiveMessageStore.push(message);
  },

  setArchiveMessage(message) {
    archiveMessageStore = message;
  },

  getSeenUsers() {
    return seenUsersStore;
  },

  setSeenUsers(users) {
    seenUsersStore = users;
  },

/**
 * @description AppStore emit event change
 *
 * @memberof AppStore
 *
 * @method emitChange
 *
 * @returns { void }
 */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
 * @description AppStore change listener. Listens to change from the store
 * with respect to the listener in the component
 *
 * @param { Object } callback
 *
 * @method addChangeListener
 *
 * @memberof AppStore
 *
 * @returns {void}
 */
  addChangeListener(callback) {
    this.on('change', callback);
  },

/**
 * @description Remove AppStore change listener
 *
 * @param { Object } callback
 *
 * @method removeChangeListener
 *
 * @memberof AppStore
 *
 * @returns { void }
 */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case AppConstants.SIGN_UP:
      AppAPI.signUpUser(action.userDetails);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_USERS:
      AppStore.setDatabaseUsers(action.users);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_EMAILS:
      AppStore.setEmails(action.emails);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_NUMBERS:
      AppStore.setAllUsersNumber(action.numbers);
      AppStore.emit(CHANGE_EVENT);
      break;


    case AppConstants.SAVE_GROUP:
      AppAPI.saveGroup(action.group);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_GROUPS:
      AppAPI.getGroups(action.userName);
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
      AppAPI.addUserToGroup(action.addUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SAVE_MESSAGE:
      AppStore.saveMessages(action.message);
      AppAPI.postMessages(action.message);
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
      AppAPI.login(action.userDetails);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_LOGIN:
      AppStore.saveUser(action.user);
      AppStore.setAuthenticatedState();
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.LOGOUT:
      localStorage.clear();
      location.reload();
      AppStore.setLogout();
      AppAPI.setLogout();
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE_LOGIN:
      AppStore.setGoogleSignIn(action.googleUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GOOGLE_SIGNUP:
      AppAPI.googleSignUp(action.googleUser);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SEARCH_USER_MESSAGE:
      AppStore.setCurrentGroup(action.group.groupName);
      AppAPI.searchUserMessageInGroup(action.group);
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

    case AppConstants.NOTIFICATIONS:
      AppAPI.getNotifications(action.userName);
      AppStore.emit(CHANGE_EVENT);
      break;

    default:

  }

  return true;
});

module.exports = AppStore;
