const { firebase, usersRef, groupRef } = require('../config');
/** Class representing a the User Database. */
class User {
 /**
     * The Sign Up method
     * @param {string} req - User's Request
     * @param {object} res - Server Response
     * @return {object}  returns the user's details
     */
  static signup(req, res) {
    const { userName, password, email, number } = req.body;

    if (typeof userName === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined' || typeof number === 'undefined') {
      res.status(400).json({ message: 'You need to provide userName, password, number and email' });
    } else if (userName === '' || password === '' || email === '' || number === '') {
      res.status(400).json({ message: 'userName, password, number or email cannot be empty' });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        const uid = user.uid;
        user.updateProfile({
          displayName: userName
        });
        user.sendEmailVerification().then(() => {
          res.status(201).send(user);
        });
        usersRef.child(userName).set({
          userName,
          password,
          email: user.email,
          uid,
          number
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
     * The Google Sign Up method
     * @param {number} req - User's Request
     * @param {number} res - Server Response
     * @return {object}  returns the user's details
     */
  static google(req, res) {
    const googleUser = req.body.googleUser;
    const { userName, email, uid, number } = googleUser;

    usersRef.child(userName).set({
      userName,
      email,
      uid,
      number
    }); 
    const rootRef = firebase.database().ref()
    .child('users')
    .child(userName)
    .child('Groups');
    rootRef.once('value', (snap) => {
      const data = snap.val()
      const groups = []
      let group = {}  
      for (var i in data){
        group = {            
          groupName: data[i].groupName,
          userName: data[i].userName      
        }
        groups.push(group)
       }  

      res.status(200).send({
        message: 'Welcome to Post it app',
        userData: user,
        groups
      });
    });
  }


 /**
     * The Sign In method
     * @param {number} req - User's Request
     * @param {object} res - Server Response
     * @return {object}  returns the user's details
     */
  static signin(req, res) {
    const { email, password } = req.body;   
    if (typeof email === 'undefined' || typeof password === 'undefined' ) {
      res.status(400).json({ message: 'You need to provide password and email' });
    } else if (email === '' || password === '' ) {
      res.status(400).json({ message: 'Email or Password cannot be empty' });
    } else {
      firebase.auth()
    .signInWithEmailAndPassword(email, password).then((user) => {
      const userName = user.displayName;     
      // Get all user's personal message while signing in
      const rootRef = firebase.database().ref().child('users').child(userName)
      .child('Groups');
      rootRef.once('value', (snap) => {
        const groups = [];
        let group = {}
        const groupRef = firebase.database().ref().child('users').child(userName).child('Groups');
          groupRef.once('value', (snap) => {
          snap.forEach((data) => {
            group = {  
              groupName: data.val().groupName
            };
            groups.push(group)
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
      } else if(errorCode === 'auth/user-not-found'){
          res.status(401).json({ message: error.message });
       } else if (errorCode === 'auth/wrong-password') {
        res.status(401).json({ message: error.message }); 
       
      }
    });
    }
  }

 /**
     * The Sign Out method
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


static notification(req, res){
firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // This means a user is signed in
        const userId = user.uid;
        const rootRef = firebase.database().ref().child('users');
    rootRef.once('value', snap => {
      const data = snap.val() 
      for (var i in data){           
        if (userId == data[i].uid){     
          var notification = data[i].Notifications              
        }      
        }  
   res.send(notification) 
    })
      } else {
        console.log({
          // user is not signed in
          message: 'You are not signed in right now!'
        });       
      }
    });  
  }

  //Get All Users in the Database
  static allUsers(req, res){
    const rootRef = firebase.database().ref().child('users');
    rootRef.once('value', (snap) => {
      const data = snap.val();
      const users = [];
      for(var i in data) {
        users.push(data[i].username);
      }
      res.send(users);
    });
  }

 
 //Get All Phone Numbers in the database
    static allNumbers(req, res){
    const rootRef = firebase.database().ref().child('users');
    rootRef.once('value', (snap) => {
      const data = snap.val();
      const numbers = [];
      for(var i in data) {
        numbers.push(data[i].number);
      }
      res.status(200).send(numbers);
    });
  }

  // const userRef = firebase.database().ref().child('Groups').child(groupName).child('Users');
  // userRef.once('value', snap => {
  // let user = {}
  // snap.forEach((data) => {
  //   user = {
  //     userName: data.val()
  //   }
  //   users.push(user)
  //   })   
  // })




  static resetPassword(req, res) {    
    const emailAddress = req.body.email 
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(function() {
     res.status(201).json({ message: 'An email has been sent for password reset. Log in after Reset' }); 
    }, function(error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        res.status(400).json({ message: error.message }); 
      } else if(errorCode === 'auth/user-not-found'){
          res.status(401).json({ message: error.message });
       } 
    });
  }



}
module.exports = User;

