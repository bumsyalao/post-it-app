const { firebase, usersRef, provider } = require('../config');


/** Class representing a the User Database. */
class User {
 /**
     * The Sign Up method
     * @param {string} req - User's Request
     * @param {object} res - Server Response
     * @return {object}  returns the user's details
     */
  static signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const number = req.body.number;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      const uid = user.uid;

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
        email: user.email,
        uid,
        number
      });
    })
    .catch((error) => {
      res.send(error);
    });
  }


 /**
     * The Google Sign Up method
     * @param {number} req - User's Request
     * @param {number} res - Server Response
     * @return {object}  returns the user's details
     */
  static google(req, res) {
    const googleUser = req.body.googleUser

    const username = googleUser.username;
    const email = googleUser.email;
    const uid = googleUser.uid;
    // add element to database
      usersRef.child(username).set({
        username,
        email,
        uid
      });
      const data = {
        displayName: username,
        email,
        uid
      }
      res.send(data)
  }

 /**
     * The Sign In method
     * @param {number} req - User's Request
     * @param {object} res - Server Response
     * @return {object}  returns the user's details
     */
  static signin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth()
    .signInWithEmailAndPassword(email, password).then((user) => {
      const userName = user.displayName

      const rootRef = firebase.database().ref().child('users').child(userName).child('Messages');
      rootRef.once('value', snap => {
      const data = snap.val()
      const messages = []
      let message = {}
  
      for (var i in data){
        message = {
          user: data[i].User,
          text: data[i].Message,
          group: data[i].Group      
        }
        messages.push(message)
       }   

            res.status(200).send({
        message: 'Welcome to Post it app',
        userData: user,
        message: messages
      });

    })


 
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

 /**
     * The Sign Out method
     * @param {null} req - User's Request
     * @param {object} res - Server Response
     * @return {object}  returns the user's details
     */
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
      res.send(numbers);
    });
  }


  static resetPassword(req, res) {
    const emailAddress = req.body.email 
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
     res.send('An email has been sent for password reset. Log in after Reset')
    }, function(error) {
         res.send('Error: The email address does not exist')
    });
  }



}


module.exports = User;