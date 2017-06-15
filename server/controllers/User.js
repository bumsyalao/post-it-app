const { firebase, usersRef, firebaseAuth } = require('../config');


class User {
  static signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    firebaseAuth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
    // add element to database
      usersRef.push({
        username,
        password,
        email: user.email
      });
      console.log('Signup Successful');
    })
    .catch((error) => {
      res.send(error);
    });
  }

  static signin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    firebaseAuth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        alert(error);
      } else {
        alert(errorMessage);
      }
    });

  }

  static signout(req, res) {
    firebaseAuth()
    .signOut()
    .then(() => {
      res.send('User signed out');
    })
    .catch((error) => {
      res.send(error);
    });
  }
}


module.exports = User;
