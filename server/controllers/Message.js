const { groupRef, firebase } = require('../config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Nexmo = require('nexmo');
const moment = require('moment');
const { validStringLength } = require('../helpers/validate.helper');


 /**
 * class Group: This class controls all group routes
 * @class
 */
class Message {
  /**
 * @description: posts a message in a group through
 *  route POST: /groupName/messages/notification/priority
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the posted message
 */
  static createMessage(req, res) {
    const { groupName, messages, notification, priority } = req.body;
    if (!(validStringLength(groupName, messages))) {
      res.status(400).json(
        { message: 'The Message or Groupname field is invalid' }
      );
    } else if (!(validStringLength(notification, priority))) {
      res.status(400).json(
        { message: 'The Notification or Priority field is invalid' }
      );
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userName = user.displayName;
          groupRef.child(groupName).child('Messages').push(
            {
              user: userName,
              Message: messages,
              Time: moment().format('h:mm a'),
              Priority: priority,
            })
            .then(() => {
              res.status(201).json({ message: 'Message posted successfully' });
            })
            .catch((error) => {
              res.status(500).send(error);
            });

          const users = [];
          const userRef = firebase.database()
            .ref()
            .child('Groups')
            .child(groupName)
            .child('Users');
          userRef.once('value', (userSnapshot) => {
            userSnapshot.forEach((data) => {
              users.push(data.val());
            });
            users.forEach((entry) => {
              if (entry === userName) {
                return;
              }
              const userDatabase = firebase.database();
              userDatabase.ref(`/users/${entry}/Notifications`)
              .child(notification).set(notification);
            });
          });

          const email = [];
          const emailRef = firebase.database()
            .ref()
            .child('Groups')
            .child(groupName)
            .child('Email');
          emailRef.once('value', (snap) => {
            snap.forEach((data) => {
              email.push(data.val());
            });
            const emails = email.join(',');

            if ((priority === 'Urgent') || (priority === 'Critical')) {
              const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                auth: {
                  user: 'wesumeh@gmail.com',
                  pass: 'dericoderico'
                }
              }));
              const mailOptions = {
                from: '"PostIt App" <admin@postit.com>',
                to: emails,
                subject: 'New Message Received',
                text: 'PostIt App ?',
                html: '<p>Hello</p><h2>This is to notify you that a vey urgent message which may have a critical priority level has been posted in ' + groupName + ' group</h2>' // html body
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
            .child(groupName)
            .child('Number');
          numberRef.once('value', (snap) => {
            snap.forEach((data) => {
              number.push(data.val());
            });
            if (priority === 'Critical') {
              const nexmo = new Nexmo({
                apiKey: '47f699b7',
                apiSecret: 'ebc6283d134add6e'
              });
              number.forEach((entry) => {
                nexmo.message.sendSms(
                  'Post-It', entry, 'Post-It App. This is to notify you that an urgent message which has a critical priority level has been posted in ' + groupName + ' group',
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

    /**
 * @description: retrieves all users who have seen a message
 * route GET: group/seenMessage
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all users who have seen a message
 */
  static seenMessage(req, res) {
    const { groupName, messageID } = req.params;
    groupRef.child(groupName)
    .child('Messages')
    .child(messageID).child('Seen')
    .once('value', (users) => {
      res.status(200).send(users);
    });
  }

}


module.exports = Message;
