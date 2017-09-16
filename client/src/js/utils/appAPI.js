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

  getNotifications() {
    axios.get('/user/notification')
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
    axios.post('/groupName/messages/notification/priority', {
      groupName: message.group,
      messages: message.text,
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
    axios.get(`/groups/${groupName}/${messageID}`)
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

      if (response.data === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        toastr.error(response.data);
      } else if (response.data.message ===
         'The password is invalid or the user does not have a password.') {
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        toastr.success('Welcome To PostIt');
      }
    }).catch((error) => {
         console.log(error);
    });
  },

  setLogout() {
    axios.post('/user/signout').then((response) => {
      toastr.success(response.data.message);
    }).catch((error) => {
      console.log(error);
    });
  },

  searchUserMessageInGroup(keyName) {
    const groupName = keyName;
    axios.get(`/groups/${groupName}`)
      .then((users) => {
        const messages = users.data.messages;
        const user = users.data.users;
        AppActions.receiveMessages(messages);
        AppActions.receiveUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  google(googleUser) {
    if (googleUser.number) {
      axios.post('/user/google', { googleUser
      }).then((response) => {
        const user = response.data;
        AppActions.receiveLogin(user);
        toastr.warning('Google Sign Up feature is incomplete ');
      }).catch((error) => {
        console.log(error);
      });
    }
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

