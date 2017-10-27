import axios from 'axios';
import toastr from 'toastr';

import { getToastError } from './../helpers/utils';
import AppActions from '../actions/AppActions';


const AppAPI = {
/**
   * @description describes an API call to the server for a post request
   * to register a user
   *
   * @param { Object } contact
   *
   * @returns { Object } returns registered user registration details
   */
  saveContact(contact) {
    return axios.post('/user/signup', {
      userName: contact.username,
      email: contact.email,
      password: contact.password,
      number: contact.number
    }).then((response) => {
      const user = response.data.userData;
      AppActions.receiveLogin(user);
      toastr.success('Welcome,  An email will be sent to you.');
    })
    .catch(getToastError);
  },


 /**
   * @description describes an API call to the server for a post request
   * to save a user's group
   *
   * @param { Object } group
   *
   * @returns { Object } returns notification message
   */
  saveGroup(group) {
    return axios.post('/group', {
      group: group.groupName,
      userName: group.userName
    }).then((response) => {
      toastr.success(response.data.message);
    })
    .catch(getToastError);
  },

   /**
   * @description describes an API call to the server for a get request
   * to get all the groups that a user belong to.
   *
   * @param { Object } userName
   *
   * @returns { Object } returns an object containing user's group
   */
  getGroups(userName) {
    return axios.get(`/group/${userName}`)
    .then((response) => {
      const groups = response.data;
      AppActions.receiveGroups(groups);
    })
    .catch(getToastError);
  },

   /**
   * @description describes an API call to the server for a get request
   * to get a user's notification.
   *
   * @param { Object } userName
   *
   * @returns { Object } returns an object containing user's notificaions
   */
  getNotifications(userName) {
    return axios.get(`/user/notification/${userName}`)
    .then((response) => {
      const notification = response.data;
      AppActions.receiveNotification(notification);
    })
    .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a post request
   * to save a user into a group.
   *
   * @param { Object } addUser
   *
   * @returns { Object } returns a notification message
   */
  addUserToGroup(addUser) {
    return axios.post('/group/groupName/user', {
      groupName: addUser.groupname,
      user: addUser.userName
    })
    .then((response) => {
      toastr.success(response.data.message);
    })
    .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a post request
   * to save a message.
   *
   * @param { Object } message
   *
   * @returns { void }
   */
  saveMessages(message) {
    return axios.post('/group/user/message', {
      group: message.group,
      user: message.user,
      message: message.text,
      notification: message.notification,
      priority: message.priority
    })
    .then((response) => {
      toastr.success(response.data.message);
    })
    .catch(getToastError);
  },

    /**
   * @description describes an API call to the server for a post request
   * to save a message.
   *
   * @param { Object } user
   *
   * @returns { Object } returns an object containing list of users who
   * have seen a message
   */
  seenMessage(user) {
    const groupName = user.groupName;
    const messageID = user.messageID;
    return axios.get(`/seen/${groupName}/${messageID}`)
    .then((response) => {
      AppActions.receiveSeenUsers(response.data);
    })
    .catch(getToastError);
  },

    /**
   * @description describes an API call to the server for a post request
   * to login a user.
   *
   * @param { Object } contact
   *
   * @returns { Object } returns registered user details
   */
  login(contact) {
    return axios.post('/user/signin', {
      email: contact.email,
      password: contact.password
    })
    .then((response) => {
      const user = response.data.userData;
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    })
    .catch(getToastError);
  },

  /**
   * @description describes an API call to the server to sign the user out
   *
   * @returns { Object } returns registered user details
   */
  setLogout() {
    return axios.post('/user/signout').then((response) => {
      toastr.success(response.data.message);
    }).catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get the list of users and message in a group.
   *
   * @param { Object } group
   *
   * @returns { Object } returns an object that contains messages an users
   * in a group.
   */
  searchUserMessageInGroup(group) {
    const groupName = group.groupName;
    const user = group.userName;
    return axios.get(`/groups/${groupName}/${user}`)
      .then((response) => {
        const messages = response.data.messages;
        const users = response.data.users;
        AppActions.receiveMessages(messages);
        AppActions.receiveUser(users);
      })
      .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a post request
   * to register a user with a google account
   *
   * @param { Object } googleUser
   *
   * @returns { Object } returns registered user registration details
   */
  googleSignUp(googleUser) {
    const userName = googleUser.username.replace(' ', '');
    const email = googleUser.email;
    const number = googleUser.number;
    const uid = googleUser.uid;

    return axios.post('/google/signup', {
      userName,
      email,
      number,
      uid
    })
    .then((response) => {
      const user = response.data;
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    })
    .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a post request
   * to reset a user's password.
   *
   * @param { Object } email
   *
   * @returns { Object } returns a notification message
   */
  resetPassword(email) {
    return axios.post('/user/reset', { email
    }).then((response) => {
      toastr.success(response.data.message);
    })
    .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get all users.
   *
   * @returns { Object } returns an object containing list of users
   */
  getContacts() {
    return axios.get('/users/allusers')
      .then((contacts) => {
        AppActions.receiveContact(contacts.data);
      })
 ;
  },

  /**
   * @description describes an API call to the server for a post request
   * to get all numbers.
   *
   * @returns { Object } returns an object containing list of numbers
   */
  getNumbers() {
    return axios.get('/users/allnumbers')
        .then((response) => {
          AppActions.receiveNumber(response.data);
        })
        .catch(getToastError);
  },

  /**
   * @description describes an API call to the server for a get request
   * to get all emails.
   *
   * @returns { Object } returns an object containing list of emails
   */
  getEmails() {
    return axios.get('/users/allemails')
        .then((response) => {
          AppActions.receiveEmails(response.data);
        })
        .catch(getToastError);
  },

};

export default AppAPI;
