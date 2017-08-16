const { usersRef, groupRef, firebase, userGroupRef } = require('../config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Nexmo = require('nexmo');


/**
 * 
 * 
 * @class Group
 */
class Group {
  static createGroup(req, res) {
    const groupName = req.body.groupName;
    const userName = req.body.userName;
    const userKey = req.body.uid;


    const db = firebase.database();
    
    // GROUP DATABASE
    // Unique key to represnt Each Group
    const groupKey = db.ref('Groups/').push({
      groupName,
      'Admin': userName,
      'Userf': userName
      // dateCreated: requestBody.dateCreated
    }).key;

    // Add the Admin to the Group
    groupRef.child(groupKey).child('Users').push(userKey);

  //  groupRef.child(groupKey).child('Users').push("UdzkXSFb7pQiF1CBxWr0VfbOW5u1")

  //   groupRef.child(groupKey).child('Users').push('ZVmYwdUQhdhfegLrsbkotCHklNG2')



       // USER_GROUP DATABASE
   // Add List of groups for a user in the userGroup database
    userGroupRef.child(userKey).child(groupKey).set({
      groupName
    })

    userGroupRef.child(userKey).child(groupKey).child('Users').push(userKey);

    // userGroupRef.child(userKey).child(groupKey).child('Users').push('Mary')
    //  userGroupRef.child(userKey).child(groupKey).child('Users').push('Emeka')


  

    // userGroupRef.child(userKey).child('Groups').child(groupKey).child('Users').child(userKey).set({
    //   Users: 'Mary'
    // })

    // userGroupRef.child(userKey).child('Groups').child(groupKey).child(userKey).set({
    //  Users: 'Nnamso'
    // })
 
 

    // userGroupRef.child(uid).child(groupKey).child(uid)..child('GroupID')set({
    //   'Users': 'Nnamsos'
    // })

    // userGroupRef.child(groupKey).child('Users').child(uid).set({
    //   'Users': 'Mary'
    // })
    
    

    res.send('Group Created')

    // userGroupRef.child(groupKey).child('Users').push({
    //   'Users': 'Nnamsos'
    // })
    
    // groupRef.child(groupName).push({
    //   groupName,
    //   'Admin': userName,
    //   'Members': null,
    // })
    
  //  // Create  and Group and Insert Username
  //       groupRef.child(groupName).child('Users').child(userName).set(userName)

  //       // Push the user's details into Group/ Users
  //       db.ref(`/users/${userName}/Groups`).push({
  //         groupName,
  //         userName
  //       }).then(() => {
  //         res.send(`Group ${groupName} created`);
  //       }).catch((err) => {
  //         res.send(err);
  //       });


  }


  static addUserToGroup(req, res) {
    const groupKey = req.body.groupKey;
    const userKey = req.body.userKey;

    groupRef.child(groupKey).child('Users').push(userKey);

    let users = [];
    groupRef.child(groupKey).child('Users').once('value', (snapShot) => {
      snapShot.forEach((childSnapShot) => {
        users.push(childSnapShot.val());
      });
     
      // Add all the users in a group to the user just added
      users.forEach((entry) => {            
        userGroupRef.child(userKey).child(groupKey).child('Users').push(entry);
      });

      // Remove the Users key before iterating throught the users, this is to avoid double repeatation
      users = users.filter(item => item !== userKey);

      // Loop through the User Group Database and add list of newly added users
      users.forEach((entry) => {       
        userGroupRef.child(entry).child(groupKey).child('Users').push(userKey);
      });
    });
      
    res.send('User added successfully');

}


  static allUserInAGroup(req, res) {
    const groupKey = '-KrfgkBflFn1J2yPJsE5';

    const groups = [];
    groupRef.child(groupKey).child('Users').once('value', (snapShot) => {
      snapShot.forEach((childSnapShot) => {
         groups.push(childSnapShot.val());
      });
         res.send(groups)
         console.log(groups)     
    });
  }



   static createMessage(req, res) {
    const groupKey = req.body.groupKey;
    const messages = req.body.messages;
    const emails = req.body.emails;
    const numbers = req.body.numbers;
    const allUsers = req.body.allUsers;
    const notification = req.body.notification;
    const priority = req.body.priority;
    const userKeys = req.body.userKeys;  // Get all uid form Users,
    const groupName = req.body.groupName;
    res.send(req.body)

    const db = firebase.database();

    // Converts the list of numbers into array
     const number = numbers.split(',');

    // Converts the list of allUsers into array
    const allUser = allUsers.split(',');


     // Converts the list of UserKeys into array
    const userKey = userKeys.split(',');


      // Create a Message in the Group Database
      const messageKey = groupRef.child(groupKey).child('Messages').push({
      messages,
      emails,
      numbers,
      allUsers,
      allUser,
    }).key;



    userKey.forEach((entry) => {
      // Add the messages to the UserGroup database
     userGroupRef.child(entry).child(groupKey).child('Message').child(messageKey).set({
      messages,
      emails,
      numbers,
      allUsers,
      allUser,
    })
  });

      userKey.forEach((entry) => {
       // Add the messages to the UserGroup database
     userGroupRef.child(entry).child(groupKey).child('Notification').child(messageKey).set({
        notification
    })

  });


     
      // // Add all the users in a group to the user just added
      // users.forEach((entry) => {            
      //   userGroupRef.child(userKey).child(groupKey).child('Users').push(entry);
      // });

      // // Remove the Users key before iterating throught the users, this is to avoid double repeatation
      // users = users.filter(item => item !== userKey);

      // // Loop through the User Group Database and add list of newly added users
      // users.forEach((entry) => {       
      //   userGroupRef.child(entry).child(groupKey).child('Users').push(userKey);
      // });
    // });

    const us = ['ZVmYwdUQhdhfegLrsbkotCHklNG2', 'UdzkXSFb7pQiF1CBxWr0VfbOW5u1' ]
       us.forEach((entry) => {
               let email = [];
    usersRef.child(entry).child('email').once('value', (snapShot) => {
      snapShot.forEach((childSnapShot) => {
        // email.push(childSnapShot.val()); 
        console.log(snapShot)
      
              //  email.push(snapShot.val())
              //  email.concat(snapShot.val())
               

       snapShot.forEach((snapShot) => {
         
        //  console.log(snapShot)
      });
        
         console.log(childSnapShot)    

      }); 
     

  });


       })


        if ((priority === 'Urgent') || (priority === 'Critical')) {
         // Send Email Notification to Users
        const transporter = nodemailer.createTransport(smtpTransport({
          service: 'gmail',
          auth: {
            user: 'wesumeh@gmail.com',
            pass: 'dericoderico'
          }
        }));
        const mailOptions = {
          from: '"PostIt App" <admin@postit.com>', // sender address
          to: emails, // list of receivers
          subject: 'New Message Received', // Subject line
          text: 'PostIt App ?', // plain text body
          html: '<p>Hello</p><h2>This is to notify you that a vey urgent message which may have a critical priority level has been posted in '+ groupName +' group</h2>' // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              // console.log(error);
            res.send(error);
          }
          console.log('Message %s sent: %s', info);
         
        });
      }
        if (priority === 'Critical') {
        // Send SMS Notification to Users in a particular Group
          const nexmo = new Nexmo({
            apiKey: '47f699b7',
            apiSecret: 'ebc6283d134add6e'
          });
      // Loop through the numbers and send sms per each number
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
      

  }

  
}


module.exports = Group;

