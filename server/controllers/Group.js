const { usersRef, groupRef, firebase } = require('../config');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const Nexmo = require('nexmo');


class Group {
  static createGroup(req, res) {
    const groupName = req.body.groupName; 
    const userName = req.body.userName
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
          res.send(`Group ${groupName} created`);
        }).catch((err) => {
          res.send(err);
        });
      } else {
        res.send('Group already exists');
      }
    }).catch((err) => {
            res.status(401).send({
              message: `Something went wrong ${err.message}`,
            });
          });
   

  }

static addUser(req, res) {
		const groupName = req.params.groupName;
		const user = req.params.user;

     const db = firebase.database();
 
		usersRef.child(user).once('value', (snapshot) => {
				const username = snapshot.exists() ? snapshot.val().username : "null";
        const email = snapshot.exists() ? snapshot.val().email : "null";
        const number = snapshot.exists() ? snapshot.val().number : "null";

        // //Push the user's details into Group/ Users
        db.ref(`/users/${user}/groups`).child(groupName).set(groupName);
       
        
        //Push the user's details into Group
				groupRef.child(groupName).child('Users').child(username).set(username)
        groupRef.child(groupName).child('Email').push(email)
        groupRef.child(groupName).child('Number').push(number)
        
        .then(() => {
						res.send('User added successfully');
					});
			})
			.catch((err) => {
				res.send('Error');
			});
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

    //Converts the list of numbers into array
    const number = numbers.split(",");

    //Converts the list of allUsers into array
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
        
firebase.database().ref().child('Groups').once('value', snap => { 
    const data = snap.val()   
    const groups = []
        Object.keys(data).map((keyName, keyIndex) => {
        groups.push(keyName)          
        }) 

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

          message ={
                uid: keyName,
                User: allMessage[keyName].User,
                Message: allMessage[keyName].Message,
                Group: entry,
              
            
          }
         messages.push(message)

            })  
             db.ref(`/users/${userName}/Messages`).push(message)
      
            })
        }          
        }
    }) 
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


// Nodemailer Sample for sending Emails
static mailer(req, res) {
let transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
        user: 'wesumeh@gmail.com',
        pass: 'dericoderico'
    }
}));

let mailOptions = {
    from: '"Fred Foo 👻" <wesumeh@gmail.com>', // sender address
    to: 'charpellumeh@gmail.com, bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>You are the best</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    }
    console.log('Message %s sent: %s', info);
});



  }

// Nexmo Sample for sending SMS
    static sms(req, res){
      const nexmo = new Nexmo({
      apiKey: '47f699b7',
      apiSecret: 'ebc6283d134add6e'
    });

      nexmo.message.sendSms(
        'Post-It', '2349055483634', 'Testing',
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.log(responseData);
            }
          }
      );
    }


}


module.exports = Group;

