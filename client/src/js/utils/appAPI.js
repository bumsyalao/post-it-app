import AppActions from '../actions/AppActions';
import axios from 'axios';
import toastr from 'toastr';


module.exports = {
  saveContact(contact) {
    axios.post('/user/signup', {
      userName: contact.username,
      email: contact.email,
      password: contact.password,
      number: contact.number
    }).then((response) => {
      const user = response.data;

      if (response.data.message === 'The email address is already in use by another account.') {
        toastr.error(response.data.message);
      } else if (response.data.message === 'The email address is badly formatted.'){               
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        console.log(response)
        console.log(user)
        toastr.success('Welcome,  An email will be sent to you, please verify your account.') 
      }
    }).catch((error) => {
      console.log(error);
    });
  },

    // Get all Contacts from database, this will use for validation
  getContacts() {
    axios.get('/users/allusers')
      .then((contacts) => {
        AppActions.receiveContact(contacts.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

       // Get all Numbers from database, this will use for validation
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
      toastr.success(response.data);
    }).catch((error) => {
      console.log(error);
    });
  },

        //Get list of Groups from Database
  getGroups() {
    axios.get('/user/database')
    .then((group) => {
      const groups = group.data;
      AppActions.receiveGroup(groups);
      console.log(groups)
    })
    .catch((error) => {
      console.log(error);
    });
  },
       
  // Get Notifications from Database
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

  saveGroupUser(addUser) {
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

  // removeMessage(messageId) {
  //   console.log(messageId)
  //   axios.post('/user/archive/messageId', {
  //     messageId
  //   })
  //       .then((message) => {
  //         AppActions.archiveMessages(message.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // },

  seenMessage(user) {
    const uid = user.uid;
    const userName = user.userName;
    const groupName = user.groupName;
    axios.post(`/seen/${groupName}/${uid}/${userName}`)
    .then((message) => {
      AppActions.receiveSeenUsers(message.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },

  // updateInbox(user) {
  //   axios.post(`/user/inbox/${user}`)
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // },


  login(contact) {
    axios.post('/user/signin', {
      email: contact.email,
      password: contact.password
    }).then((response) => {
      const user = response.data.userData;
      const groups = response.data.groups;

      if (response.data === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        toastr.error(response.data);
      } else if (response.data.message === 'The password is invalid or the user does not have a password.'){               
        toastr.error(response.data.message);
      } else {
        AppActions.receiveLogin(user);
        AppActions.receiveGroups(groups);  
          
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


  searchUserMessage(keyName) {
    const groupName = keyName;
    axios.get(`/groups/${groupName}`)
      .then((users) => {
        const messages = users.data.messages;
        const user = users.data.users;
        AppActions.receiveMessages(messages)
        AppActions.receiveUser(user)
      })
      .catch((error) => {
        console.log(error);
      });
  },

  google(googleUser) {
    console.log(googleUser+ 'Front')
    if (googleUser.number) {
      axios.post('/user/google', { googleUser
      }).then((response) => {
        const user = response.data.userData;
        const groups = response.data.groups;
        AppActions.receiveLogin(user);
        AppActions.receiveGroups(groups);
        toastr.warning('Google Sign Up feature is incomplete ');
      }).catch((error) => {
        console.log(error);
      });
    }
  },

  googleLogin(googleUser) {
    axios.post('/google/login', {
      userName: googleUser,
    });
    console.log(googleUser);
  },

  resetPassword(email) {
    axios.post('/user/reset', { email
    }).then((response) => {
      toastr.success(response.data);
    }).catch((error) => {
      console.log(error);
    });
  },

};

