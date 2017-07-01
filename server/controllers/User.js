const { firebase, usersRef, provider } = require('../config');


class User {
  static signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
   firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const uid = user.uid

      // update the username of the user
         user.updateProfile({
           displayName: username
         });

         // send verification email to user
         user.sendEmailVerification().then(() => {
           res.send(user);
         });

    // add element to database
      usersRef.push({
        username,
        password,
        email:user.email,
        uid
      });

    })
    .catch((error) => {
      res.send(error);
    });
  }

  static google(req, res){
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  res.send("Aith "+ result)
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
  }

  static signin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth()
    .signInWithEmailAndPassword(email, password).then((user) => {
        console.log('signs in user');
        res.status(200).send({
          message: 'Welcome to Post it app',
          userData: user
        });
      })
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
    firebase.auth()
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