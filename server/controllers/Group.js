const { usersRef, groupRef, firebase } = require('../config');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


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
        db.ref(`/users/${userName}/groups`).child(groupName).set(groupName).then(() => {

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
				const userName= snapshot.exists() ? snapshot.val().username : null;
        const email = snapshot.val().email

        // //Push the user's details into Group/ Users
        db.ref(`/users/${user}/groups`).child(groupName).set(groupName);
        // usersRef.child(userName).child('Groups').child(userName).set(userName)
        
        //Push the user's details into Group
				groupRef.child(groupName).child('Users').child(userName).set(userName)
        groupRef.child(groupName).child('Email').push(email)
        
       
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
    // const user = req.params.user;
    const Message = req.params.messages;
    const emails = req.params.emails

       firebase.auth().onAuthStateChanged((user) => {
      if (user) {
     
        //Push the message into Group
				groupRef.child(groupName).child("Messages").push(
        {  
          User: user.displayName,
          Message,
          Priority: 'Normal' 
        }
        ).then(() => {
						res.send('Message added successfully');
					}).catch((err) => {
				res.send('Error');
			});

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
          html: '<p>Hello</p><h5>This is to notify you that a message has been posted to '+ groupName +' group</h5>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
          }
          console.log('Message %s sent: %s', info);
      });



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


// Nodemailer Sample
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



}


module.exports = Group;

