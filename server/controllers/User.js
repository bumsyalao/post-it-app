const { firebase, usersRef, provider } = require('../config');


class User {
  static signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
   firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
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
      usersRef.child(username).set({
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
  
       return res.status(200).send({
          message: 'Welcome to Post it app',
          userData: user
        });
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') { 
        return res.send(error);
      } else {
        res.send(errorMessage);
      }
    });

  }

  static signout(req, res) {

      firebase.auth().signOut().then(() => {
      res.send({
        message: 'You are successfully signed out'
      });
    }).catch((error) => {
      res.status(405).send({
        message: `Sorry, ${error.message}. please try to sign out again`
      });
    });
  }

static database(req, res){
firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // This means a user is signed in
        const userId = user.uid;
        const rootRef = firebase.database().ref().child('users');

    rootRef.once('value', snap => {
      const data = snap.val()
      const contacts = [] 
      let contact = {}   

      // get the group of a user 
      for (var i in data){           
        if (userId == data[i].uid){     
          var groups = data[i].groups
        
        }
       
        }
    
   res.send(groups) 

    })

      } else {
        console.log({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
       
      }
    });  
  }

static allUsers(req, res){

        const rootRef = firebase.database().ref().child('users');

    rootRef.once('value', snap => {
      const data = snap.val()
      const users = []
  
     
    
        for(var i in data){
          users.push(data[i].username)
        }
       res.send(users)

    })

      
  }



}


module.exports = User;