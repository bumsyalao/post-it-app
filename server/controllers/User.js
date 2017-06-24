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
        email:user.email
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
        res.send(error);
      } else {
        res.send(errorMessage);
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

    rootRef.once('value', snap => {
      const key = snap.key
      const data = snap.val()
      const contacts = []
      let contact = {}

      for (var i in data){

        contact = {
          id: i,
          uid: data[i].uid,
          username: data[i].username,
          email: data[i].email,
          password: data[i].password
        }
        contacts.push(contact)
       }
       
       res.send(contacts) 

    })
   
  }
}


module.exports = User;