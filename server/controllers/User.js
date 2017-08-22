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

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      const uid = user.uid;

      user.updateProfile({
        displayName: userName
      });

      user.sendEmailVerification().then(() => {
        res.send(user);
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
    const userName = googleUser.userName;
    const email = googleUser.email;
    const uid = googleUser.uid;
    const number = googleUser.number;
    // add element to database
      usersRef.child(userName).set({
        userName,
        email,
        uid,
        number
      });

           // Get all user's personal message while signing in
      const rootRef = firebase.database().ref().child('users').child(userName).child('Messages');
      rootRef.once('value', snap => {
      const data = snap.val()
      const messages = []
      let message = {}
  
      for (var i in data){
        message = {
          uid: data[i].uid,
          user: data[i].User,
          text: data[i].Message,
          group: data[i].Group,  
        }
        messages.push(message)
       }   

       const user = {
         displayName: userName
       }

        res.status(200).send({
        message: 'Welcome to Post it app',
        userData: user,
        message: messages
      });
    })


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
      
      // Get all user's personal message while signing in
      const rootRef = firebase.database().ref().child('users').child(userName).child('Messages');
      rootRef.once('value', snap => {
      const data = snap.val()
      const messages = []
      let message = {}
  
      for (var i in data){
        message = {
          uid: data[i].uid,
          user: data[i].User,
          text: data[i].Message,
          group: data[i].Group,  
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


 static seenMessage(req, res){
  const uid = req.params.uid;
  const userName = req.params.userName
  const groupName = req.params.groupName

   groupRef.child(groupName).child('Messages').child(uid).child("Seen").push({Seen: userName})
   groupRef.child(groupName).child('Messages').child(uid).child("Seen").once('value', snap => {
      const data = snap.val()
      const users = []
      let user = {}
  
    
        Object.keys(data).map((keyName, keyIndex) =>{
            user = {            
            Seen: data[keyName].Seen     
          }
          users.push(user)
        })     
        // Return back the archived Message
        res.send(users);

    })
   console.log('Done')

 }

 static messageArchive(req, res){
   const messageId = req.body.messageId
   
   console.log(messageId)

      const userName = 'Hh'
        const rootRef = firebase.database().ref().child('users').child(userName).child('Messages');
        rootRef.once('value', snap => { 
        const data = snap.val()   
        const messages = []
        let message = {}
  
        // Find the data for the messageId
        for (var i in data){
          if(i === messageId){

            firebase.database().ref().child('users').child(userName).child('Messages').child(i).remove()
            firebase.database().ref().child('users').child(userName).child('Messages').child(messageId).remove()


            // This will Store The message inside User/Archive Object before its been removed
          //   firebase.database().ref().child('users').child(userName).child('Archives').push({
          //   user: data[i].User,
          //   text: data[i].Message,
          //   group: data[i].Group   
          // })
          // console.log(i)
        }   
      } 
    })

}

static database(req, res){
firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // This means a user is signed in
      const userName = user.displayName

   const groupRef = firebase.database().ref().child('users').child(userName).child('Groups');
      groupRef.once('value', snap => {
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
        // Return back the archived Message
        res.send(groups);

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
        users.push(data[i].userName);
      }
      res.send(users);
    });
  }

    //Get All Personal Message
  static personalMessage(req, res){
      firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // This means a user is signed in
              const userName = user.displayName;
      
               // Get an array of all the group names in the Group database
           
                firebase.database().ref().child('Groups').once('value', snap => { 
                    const data = snap.val()   
                    const groups = []

                    // Loop through the Group database to get all groups
                    Object.keys(data).map((keyName, keyIndex) => {
                      groups.push(keyName)          
                    }) 

    

        // Loop through every user inside every group
        //if the userName match, output  all messages from every group
        groups.forEach((entry) => {
          firebase.database().ref().child('Groups').child(entry).child('Users').once('value', snap => { 
          const data = snap.val() 
           
        for (var i in data){
     
          if(i === userName){             
            firebase.database().ref().child('Groups').child(entry).child('Messages').once('value', snap => {
              const allMessage = snap.val()  
              var messages = []
              var message = {}
                                     
              Object.keys(allMessage).map((keyName, keyIndex) => {

                      message = {
                            uid: keyName,
                            user: allMessage[keyName].User,
                            text: allMessage[keyName].Message,
                            group: entry,
                    
                            }
                            messages.push(message)
                            
                                             
                 })                              
              })  
          }

        }          
            })
        } ) 

      }  )

            } else {
              console.log({
                // user is not signed in
                message: 'You are not signed in right now!'
              });
            
            }
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