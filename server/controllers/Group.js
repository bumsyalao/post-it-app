const { usersRef, groupRef, firebase } = require('../config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Nexmo = require('nexmo');
const { validStringContent, validStringLength } = require('../helpers/validate.helper');




class Group {
  static createGroup(req, res) {
    const { groupName, userName } = req.body;

    if (!(validStringLength(userName, groupName) && validStringContent(userName, groupName))) {
        res.status(400).json({ message: 'The Username or Groupname field is invalid' });
      } else {
        const db = firebase.database();  
        groupRef.child(groupName).once('value', (snapshot) => {
        if (!snapshot.exists()) { 
     // Create  and Group and Insert Username
            groupRef.child(groupName).child('Users').child(userName).set(userName)
  
          //Push the user's details into Group/ Users
          db.ref(`/users/${userName}/Groups`).push({
            groupName,
            userName
          }).then(() => {
            res.status(201).json({ message: `Group ${groupName} created` });
          }).catch((error) => {
            res.status(500).json({ message: error });
          });
        } else {
          res.status(409).json({ message: 'Group already exists' });
        }
      }).catch((err) => {
          res.status(401).json({ message: `Something went wrong ${err.message}` });
        });

      }
   
    }
    


  

  static addUserToGroup(req, res) {
    const { groupName, user } = req.body;
    if (!(validStringLength(groupName, user) && validStringContent(groupName, user))) {
      res.status(400).json({ message: 'The Username or Groupname field is invalid' });
    } else {
      const db = firebase.database();   
      usersRef.child(user).once('value', (snapshot) => {
        if (snapshot.exists()) {
          const username = snapshot.val().username;
          const email = snapshot.val().email;
          const number = snapshot.val().number;
          //Push the user's details into Group/ Users
          db.ref(`/users/${user}/groups`).child(groupName).set(groupName);   

          //Push the user's details into Group but first check if the group exist
          groupRef.child(groupName).once('value', (groupSnapshot) => {                 
              if (groupSnapshot.exists()) { 
                groupRef.child(groupName).child('Users').child(username).set(username)
                groupRef.child(groupName).child('Email').push(email)
                groupRef.child(groupName).child('Number').push(number)     
              } else {
                res.status(403).json({ message: "Group dosen't exists" });
              }     
          })        
          .then(() => {
              res.status(201).json({ message: 'User added successfully' });
          });    
        } else {
          res.status(403).json({ message: "The User dosen't exist" })
        }   
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });  
      }

}


  static addMessage(req, res) {
	  const groupName = req.params.groupName;
    const messages = req.params.messages;
    const emails = req.params.emails;
    const numbers = req.params.numbers;
    const allUsers = req.params.allUsers;
    const notification = req.params.notification;
    const priority = req.params.priority;
    const db = firebase.database();

    // Converts the list of numbers into array
    const number = numbers.split(",");

    // Converts the list of allUsers into array
    const allUser = allUsers.split(",");

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userName = user.displayName
       
       // loop through the user names in user database and add notifications
        allUser.forEach((entry) => {
           db.ref(`/users/${entry}/Notifications`).child(notification).set(notification);
        })
         
        //Push the message into Group
				groupRef.child(groupName).child("Messages").push(
        {  
          User: user.displayName,
          Message: messages,
          Priority: priority,

        })
        
        // loop through the user names in user database and add notifications
        allUser.forEach((entry) => {
           db.ref(`/users/${entry}/Messages`).push(
        {  
          User: user.displayName,
          Message: messages,
          Priority: priority,

        })

        })

 .then(() => {
res.send('Message added successfully');
}).catch((err) => {
res.send('Error');
});


      if((priority === 'Urgent') || (priority === 'Critical')){
         // Send Email Notification to Users
      let transporter = nodemailer.createTransport(smtpTransport({
      service: "gmail",
      auth: {
          user: 'wesumeh@gmail.com',
          pass: 'dericoderico'
      }
      }));
      let mailOptions = {
          from: '"PostIt App" <admin@postit.com>', // sender address
          to: emails, // list of receivers
          subject: 'New Message Received', // Subject line
          text: 'PostIt App ?', // plain text body
          html: '<p>Hello</p><h2>This is to notify you that a vey urgent message which may have a critical priority level has been posted in '+ groupName +' group</h2>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
          }
          console.log('Message %s sent: %s', info);
      });

    }
    
    if(priority === 'Critical'){
        //Send SMS Notification to Users in a particular Group
        const nexmo = new Nexmo({
        apiKey: '47f699b7',
        apiSecret: 'ebc6283d134add6e'
      });
      
      //Loop through the numbers and send sms per each number
        number.forEach((entry) => {
          nexmo.message.sendSms(
            'Post-It', entry, 'Post-It App. This is to notify you that an urgent message which has a critical priority level has been posted in '+ groupName +' group',
              (err, responseData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(responseData);
                }
              }
          );

    });

    }

      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });
	}

  
    static database(req, res){
      const groupName = req.params.groupName

      const rootRef = firebase.database().ref().child('Groups').child(groupName);
      rootRef.once('value', (snapshot) => {
          res.send(snapshot)

        })  
    }



  static messageDatabase(req, res){
    const groupName = req.params.groupName
  const rootRef = firebase.database().ref().child('Groups').child(groupName).child('Messages');

  rootRef.once('value', snap => {
  const key = snap.key
  const data = snap.val()
  const messages = []
  let message = {}
  

  for (var i in data){
    message = {
      id: i,
      user: data[i].User,
      text: data[i].Message,
      Priority: data[i].Priority
    }
    messages.push(message)
    }      
    res.send(messages) 
})

}

}


module.exports = Group;