import axios from 'axios';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';

module.exports = {
  saveContact(contact) {
    axios.post('/user/signup', {
      userName: contact.username,
      email: contact.email,
      password: contact.password,
      number: contact.number
    }).then((response) => {
      const user = response.data;
      if (response.data.message ===
         'The email address is already in use by another account.') {
        toastr.error(response.data.message);
      } else if (response.data.message ===
         'The email address is badly formatted.') {
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        toastr.success('Welcome,  An email will be sent to you.');
      }
    }).catch((error) => {
      console.log(error);
    });
  },

  getContacts() {
    axios.get('/users/allusers')
      .then((contacts) => {
        AppActions.receiveContact(contacts.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getNumbers() {
    axios.get('/users/allnumbers')
        .then((response) => {
          AppActions.receiveNumber(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  },

  getEmails() {
    axios.get('/users/allemails')
        .then((response) => {
          AppActions.receiveEmails(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  },

  saveGroup(group) {
    axios.post('/group', {
      groupName: group.groupName,
      userName: group.userName
    }).then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      console.log(error);
    });
  },

  getGroups(userName) {
    axios.get(`/group/${userName}`)
    .then((response) => {
      const groups = response.data;
      AppActions.receiveGroups(groups);
    }).catch((error) => {
      console.log(error);
    });
  },

  getNotifications(userName) {
    axios.get(`/user/notification/${userName}`)
    .then((response) => {
      const notification = response.data;
      AppActions.receiveNotification(notification);
    })
    .catch((error) => {
      console.log(error);
    });
  },

  addUserToGroup(addUser) {
    axios.post('/group/groupName/user', {
      groupName: addUser.groupname,
      user: addUser.userName
    })
    .then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      console.log(error);
    });
  },

  saveMessages(message) {
    axios.post('/group/user/message/notification/priority', {
      group: message.group,
      user: message.user,
      message: message.text,
      notification: message.notification,
      priority: message.priority
    })
    .then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      console.log(error);
    });
  },

  seenMessage(user) {
    const groupName = user.groupName;
    const messageID = user.messageID;
    axios.get(`/seen/${groupName}/${messageID}`)
    .then((response) => {
      AppActions.receiveSeenUsers(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },

  login(contact) {
    axios.post('/user/signin', {
      email: contact.email,
      password: contact.password
    }).then((response) => {
      const user = response.data.userData;
      const groups = response.data.groups;

      if (response.data === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        toastr.error(response.data);
      } else if (response.data.message ===
         'The password is invalid or the user does not have a password.') {
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        AppActions.receiveGroups(groups);
        toastr.success('Welcome To PostIt');
      }
    }).catch(() => {
      toastr.error('Your email or password is invalid');
    });
  },

  setLogout() {
    axios.post('/user/signout').then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      console.log(error);
    });
  },

  searchUserMessageInGroup(group) {
    const groupName = group.groupName;
    const user = group.userName;
    axios.get(`/groups/${groupName}/${user}`)
      .then((response) => {
        const messages = response.data.messages;
        const users = response.data.users;
        AppActions.receiveMessages(messages);
        AppActions.receiveUser(users);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  googleSignUp(googleUser) {
    const userName = googleUser.username.replace(' ', '');
    const email = googleUser.email;
    const number = googleUser.number;
    const uid = googleUser.uid;

    axios.post('/google/signup', {
      userName,
      email,
      number,
      uid
    }).then((response) => {
      const user = response.data;
      AppActions.receiveLogin(user);
      toastr.success('Welcome To PostIt');
    }).catch((error) => {
      console.log(error);
    });
  },

  resetPassword(email) {
    axios.post('/user/reset', { email
    }).then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      console.log(error);
    });
  },

};

