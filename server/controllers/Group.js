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
            groupRef.child(groupName).child('Users').child('Bot').set('Bot')
            groupRef.child(groupName).child('Email').push('bot@postit.com')
            groupRef.child(groupName).child('Number').push('2348066098146')  
  
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
          db.ref(`/users/${user}/Groups`).push({
            groupName
          });  

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


  static createMessage(req, res) {
    const { groupName, messages, notification, priority } = req.body;

    if (!(validStringLength(groupName, messages) && validStringContent(groupName, messages))) {
      res.status(400).json({ message: 'The Message or Groupname field is invalid' });
    } else if (!(validStringLength(notification, priority) && validStringContent(notification, priority))) {
      res.status(400).json({ message: 'The Notification or Priority field is invalid' });
    } else {
    const db = firebase.database();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userName = user.displayName
                
        //Push the message into Group
				groupRef.child(groupName).child("Messages").push(
        {  
          User: user.displayName,
          Message: messages,
          Priority: priority,
        })
        .then(() => {
          res.status(201).json({ message: 'Message added successfully'});
          }).catch((error) => {
          res.status(500).send(error);
          });

          // Notify Every User for Notification
          const users = []
          const userRef = firebase.database()
            .ref()
            .child('Groups')
            .child('Andela')
            .child('Users');
          userRef.once('value', snap => {
          let user = {}
          snap.forEach((data) => {
            users.push(data.val())
            })   
            users.forEach((entry) => {
              const db = firebase.database(); 
              db.ref(`/users/${entry}/Notifications`).child(notification).set(notification);
           }) 
          })

          // Send an Email to every User in the Group
          const email = [];
          const emailRef = firebase.database()
            .ref()
            .child('Groups')
            .child('Andela')
            .child('Email');
          emailRef.once('value', (snap) => {
            snap.forEach((data) => {
              email.push(data.val());
            });
            const emails = email.join(',');

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
          });
          

          const number = [];
          const numberRef = firebase.database()
            .ref()
            .child('Groups')
            .child('Andela')
            .child('Number');
          numberRef.once('value', (snap) => {
            snap.forEach((data) => {
              number.push(data.val());
            });
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
                    (error, responseData) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(responseData);
                      }
                    }
                );
          });
          }
          });
      } else {
        res.status(403).send({
          message: 'You are not signed in right now!'
        });
      }
    });
  }
	}
 

  static usersAndMessagesInGroups(req, res) {
    const groupName = req.params.groupName;
    const messages = []
    const users = []
    
    const messageRef = firebase.database()
    .ref()
    .child('Groups')
    .child(groupName)
    .child('Messages');
    messageRef.once('value', (snap) => {
    let message = {}
    snap.forEach((data) => {    
      message = {
        id: data.key,
        user: data.val().User,
        text: data.val().Message,
        Priority: data.val().Priority
      }
      messages.push(message)
      })

      const userRef = firebase.database().ref().child('Groups').child(groupName).child('Users');
      userRef.once('value', snap => {
      let user = {}
      snap.forEach((data) => {
        user = {
          userName: data.val()
        }
        users.push(user)
        })   

        res.status(200).json({
          message: `Getting Messages and Users in ${groupName} database`,
          messages, 
          users     
        });
      })

    })


  }

  

}


module.exports = Group;