const { firebase, usersRef, groupRef, userGroupRef } = require('../config');


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
    const email = req.body.email;
    const password = req.body.password;
    const number = req.body.number;

    if (typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined' ) {
      res.json({ message: 'You need to provide username, password and email' });
    } else if (username === '' || password === '' || email === '') {
      res.json({ message: 'Username, password or email cannot be empty' });
    } else {
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
      usersRef.child(uid).set({
        username,
        password,
        email: user.email,
        uid,
        number
      });
    })

    // add element to database
          // usersRef.child(username).set({
          //   username,
          //   password,
          //   email: user.email,
          //   uid,
          //   number
          // });

      
    .catch((error) => {
      res.send(error);
    });
    }
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
      const userName = user.displayName;
      const userKey = user.uid;

     if (user) {

     const userGroup =   userGroupRef.child(userKey)
     const groups = [];
     userGroup.once('value', (snapshot) => {

       snapshot.forEach((childSnapShot) => {
         const group = {
           groupKey: childSnapShot.key,
           groupName: childSnapShot.val().groupName,
           Users: childSnapShot.val().Users
         };
         groups.push(group);
       });
       res.send(groups);
        
     });
   } else {
     res.status(403).send({
       message: 'Please log in to see a list of your groups'
     });
   }
      
    //   // Get all user's personal message while signing in
    //   const rootRef = firebase.database().ref().child('users').child(userName)
    //   .child('Messages');
    //   rootRef.once('value', (snap) => {
    //     const data = snap.val();
    //     const messages = [];
    //     let message = {};
  
    //   for (const i in data) {
    //     message = {
    //       uid: data[i].uid,
    //       user: data[i].User,
    //       text: data[i].Message,
    //       group: data[i].Group
    //     };
    //     messages.push(message);
    //   }
    //     res.status(200).send({
    //       message: 'Welcome to Post it app',
    //       userData: user,
    //       messages
    //     });
    //   });
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;

    })
    
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

   /**
     * Reset User's Password
     * @static
     * @param {any} req 
     * @param {any} res 
     * @memberof User
     */
  static resetPassword(req, res) {
    const emailAddress = req.body.email;
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(() => {
      res.send('An email has been sent for password reset. Log in after Reset');
    }, () => {
      res.send('Error: The email address does not exist');
    });
  }

  static userGroups(req, res) {
    const userKey = 'EHJ2QVUcFNNUrWOcLpf4ueGiMb02';

    const userDatabase = usersRef.child(userKey).child('Groups');
    const groups = [];
    const groupName = []

    userDatabase.once('value', (snapshot) => {
      const group = {
        name: snapshot.key,
        user: snapshot.val()
      }
      groups.push(group)
    
    })
      res.send(groups)
      console.log(groups)



    // userDatabase.once('value', (snapshot) => {

    //   snapshot.forEach((childSnapShot) => {

    //     // groups.push(childSnapShot);

    //     groupRef.child(childSnapShot.key()).once('value', (name) => {
    //       // groupName.push(name)
    //       res.send(name)
    //     })
    //         res.send(childSnapShot)

    //   });
    //   // res.send(groupName);
   
    // });


    groupRef.child("-KreXoZBPo11GhyyufB1").once('value', (name) => {
          // groupName.push(name)
          res.send(name)
        })

}



}
module.exports = User;
