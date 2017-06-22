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
        email
      });
      res.send('Signup Successful');
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

  static database(req, res){
    const rootRef = firebase.database().ref().child('users');

    rootRef.on('value', snap => {
      const data = snap.val()
      res.send(data)    
    })
   
  }
}


module.exports = User;
