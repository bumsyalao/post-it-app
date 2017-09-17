const { firebase, usersRef } = require('../config');

/**
 * class User: controls all user routes
 * @class
 */
class User {
  /**
 * @description: THis method creates a user account
 * route POST: user/signup
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the registered user
 */
  static signup(req, res) {
    const { userName, password, email, number } = req.body;

    if (typeof userName === 'undefined' || typeof email === 'undefined' ||
       typeof password === 'undefined' || typeof number === 'undefined') {
      res.status(400).json(
        { message: 'You need to provide userName, password, number and email' }
      );
    } else if (userName === '' || password === '' ||
     email === '' || number === '') {
      res.status(400).json(
        { message: 'userName, password, number or email cannot be empty' }
      );
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uid = user.uid;
        user.updateProfile({
          displayName: userName
        });
        user.sendEmailVerification().then(() => {
          usersRef.child(userName).set({
            userName,
            password,
            email: user.email,
            uid,
            number
          });
          res.status(201).send(user);
        });
      })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        res.status(400).json({ message: error.message });
      } else if (errorCode === 'auth/weak-password') {
        res.status(400).json({ message: error.message });
      } else if (errorCode === 'auth/email-already-in-use') {
        res.status(409).json({ message: error.message });
      }
    });
    }
  }

  /**
 * @description: This method controls a user's registration via Google signup
 * route POST: user/google
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the registered user
 */
  static google(req, res) {
    const googleUser = req.body.googleUser;
    const { userName, email, uid, number } = googleUser;
    usersRef.child(userName).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        usersRef.child(userName).set({
          userName,
          email,
          uid,
          number,
          google: true
        });
        res.status(201).json({
          message: 'Welcome to Post it app',
          displayName: userName
        });
      } else {
        usersRef.child(userName).child('Groups').once('value', () => {
          const groups = [];
          let group = {};
          const groupRef = firebase.database().ref().child('users')
          .child(userName)
          .child('Groups');
          groupRef.once('value', (snap) => {
            snap.forEach((data) => {
              group = {
                groupName: data.val().groupName
              };
              groups.push(group);
            });
            res.status(200).send({
              message: 'Welcome to Post it app',
              displayName: userName,
              groups
            });
          });
        });
      }
    }).catch((error) => {
      res.status(401).json(
        { message: `Something went wrong ${error.message}` }
      );
    });
  }


  /**
 * @description: This method controls a user's login
 * route POST: user/signin
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the logged-in user
 */
  static signin(req, res) {
    const { email, password } = req.body;
    if (typeof email === 'undefined' || typeof password === 'undefined') {
      res.status(400).json(
        { message: 'You need to provide password and email' }
      );
    } else if (email === '' || password === '') {
      res.status(400).json({ message: 'Email or Password cannot be empty' });
    } else {
      firebase.auth()
        .signInWithEmailAndPassword(email, password).then((user) => {
          const userName = user.displayName;
          const rootRef = firebase.database().ref()
          .child('users')
          .child(userName)
          .child('Groups');
          rootRef.once('value', () => {
            const groups = [];
            let group = {};
            const groupRef = firebase.database().ref().child('users')
            .child(userName)
            .child('Groups');
            groupRef.once('value', (snap) => {
              snap.forEach((data) => {
                group = {
                  groupName: data.val().groupName
                };
                groups.push(group);
              });
              res.status(200).send({
                message: 'Welcome to Post it app',
                userData: user,
                groups
              });
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            res.status(400).json({ message: error.message });
          } else if (errorCode === 'auth/user-not-found') {
            res.status(401).json({ message: error.message });
          } else if (errorCode === 'auth/wrong-password') {
            res.status(401).json({ message: error.message });
          }
        });
    }
  }

  /**
      * The Sign Out method
      * @description: This method logs the user out
      * @param {null} req - User's Request
      * @param {object} res - Server Response
      * @return {object}  returns the user's details
      */
  static signout(req, res) {
    firebase.auth().signOut().then(() => {
      res.status(200).send({
        message: 'You have successfully signed out'
      });
    }).catch((error) => {
      res.status(405).send({
        message: `Sorry, ${error.message}. please try to sign out again`
      });
    });
  }

  /**
 * @description: This method retrieves all notifications in user database
 * route GET: user/notification
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all notofications in the user database
 */
  static notification(req, res) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        usersRef.once('value', (snap) => {
          const usersNotificate = [];
          snap.forEach((currentUser) => {
            if (currentUser.val().uid === uid) {
              usersNotificate.push(currentUser.val().Notifications);
            }
          });
          res.status(200).send(usersNotificate);
        });
      } else {
        res.status(401).send({
          message: 'You are not signed in right now!'
        });
      }
    });
  }


  /**
 * @description: This method retrieves all users in user database
 * route GET: user/allUsers
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all users in the user database
 */
  static allUsers(req, res) {
    usersRef.once('value', (snap) => {
      const userNames = [];
      snap.forEach((nos) => {
        userNames.push(nos.val().username);
      });
      res.status(200).send(userNames);
    });
  }


  /**
 * @description: This method retrieves all numbers in user database
 * route GET: user/allNumbers
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all numbers in the user database
 */
  static allNumbers(req, res) {
    usersRef.once('value', (snap) => {
      const numbers = [];
      snap.forEach((nos) => {
        numbers.push(nos.val().number);
      });
      res.status(200).send(numbers);
    });
  }

    /**
 * @description: This method retrieves all emails in user database
 * route GET: user/allEmails
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all emails in the user database
 */
  static allEmails(req, res) {
    usersRef.once('value', (snap) => {
      const emails = [];
      snap.forEach((nos) => {
        emails.push(nos.val().email);
      });
      res.status(200).send(emails);
    });
  }

  /**
 * @description: This method reset password of users
 * route: GET: /user/reset
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
  static resetPassword(req, res) {
    const emailAddress = req.body.email;
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(() => {
      res.status(201).json(
        { message: 'An email has been sent for password reset.' }
      );
    }, (error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        res.status(400).json({ message: error.message });
      } else if (errorCode === 'auth/user-not-found') {
        res.status(401).json({ message: error.message });
      }
    });
  }

}
module.exports = User;

