import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Nexmo from 'nexmo';
import moment from 'moment';

import { usersRef, groupRef, firebase } from './../config';
import { sendNotification } from '../helpers/utils';

 /**
 * class Group: This class controls all group routes
 * @class
 */
class Message {
  /**
 * @description: posts a message in a group through
 *  route POST: /groupName/messages/
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the posted message
 */
  static createMessage(req, res) {
    const { group, user, message, notification, priority } = req.body;

    req.check('group', 'Group name is required').notEmpty().matches(/\w/);
    req.check('user', 'Username is required').notEmpty().matches(/\w/);
    req.check('message', 'Message is required').notEmpty().matches(/\w/);
    req.check('notification', 'Notification is required').notEmpty()
    .matches(/\w/);
    req.check('priority', 'Priority name is required').notEmpty().matches(/\w/);

    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors[0].msg;
      res.status(400).json({ errorMessage });
    } else {
      const currentUser = firebase.auth().currentUser;
      let googleAuth = false;

      usersRef.child(user).child('google').once('value', (snapshot) => {
        if (snapshot.exists()) {
          googleAuth = true;
        }
        if (currentUser || googleAuth) {
          const messageKey = groupRef.child(group).child('Messages').push(
            {
              user,
              message,
              time: moment().format('h:mm a, MMM Do'),
              priority
            }).key;
          groupRef.child(group)
          .child('Messages')
          .child(messageKey)
          .child('Seen')
          .child('Bot')
          .set('Bot')
            .then(() => {
              res.status(201).json({
                message: 'Message posted successfully',
                messageData: message,
                group,
                user,
                notification,
                priority

              });
            })
            .catch(() => {
              res.status(500).json(
                { message: 'Internal server error' }
              );
            });

          sendNotification(group, user, notification);

          // const users = [];
          // const userRef = firebase.database()
          //   .ref()
          //   .child('Groups')
          //   .child(group)
          //   .child('Users');
          // userRef.once('value', (userSnapshot) => {
          //   userSnapshot.forEach((data) => {
          //     users.push(data.val());
          //   });
          //   users.forEach((entry) => {
          //     if (entry === user) {
          //       return;
          //     }
          //     const userDatabase = firebase.database();
          //     userDatabase.ref(`/users/${entry}/Notifications`)
          //     .child(notification).set(notification);
          //   });
          // });

          const email = [];
          const emailRef = firebase.database()
            .ref()
            .child('Groups')
            .child(group)
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
                  user: process.env.EMAIL_USERNAME,
                  pass: process.env.EMAIL_PASSWORD
                }
              }));
              const mailOptions = {
                from: '"PostIt App" <admin@postit.com>',
                to: emails,
                subject: 'New Message Received',
                text: 'PostIt App ?',
                html: `<p>Hello</p>This is to notify you that a 
                message has been posted in ${group} group`
              };
              transporter.sendMail(mailOptions, () => {
              });
            }
          });

          const number = [];
          const numberRef = firebase.database()
            .ref()
            .child('Groups')
            .child(group)
            .child('Number');
          numberRef.once('value', (snap) => {
            snap.forEach((data) => {
              number.push(data.val());
            });
            if (priority === 'Critical') {
              const nexmo = new Nexmo({
                apiKey: process.env.NEXMO_APIKEY,
                apiSecret: process.env.NEXMO_APISECRET
              });
              number.forEach((entry) => {
                nexmo.message.sendSms(
                  'Post-It', entry, `Post-It App. This is to notify you that a
                  message has been posted in ${group} group`
                );
              });
            }
          });
        } else {
          res.status(401).send('Access denied; You need to sign in');
        }
      });
    }
  }

  static sendNotification (group, user, notification) {
    const users = [];
    const userRef = firebase.database()
      .ref()
      .child('Groups')
      .child(group)
      .child('Users');
    userRef.once('value', (userSnapshot) => {
      userSnapshot.forEach((data) => {
        users.push(data.val());
      });
      users.forEach((entry) => {
        if (entry === user) {
          return;
        }
        const userDatabase = firebase.database();
        userDatabase.ref(`/users/${entry}/Notifications`)
        .child(notification).set(notification);
      });
    });
  }

    /**
 * @description: retrieves all users who have seen a message
 * route GET: group/getReadMessageUsers
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing all users who have seen a message
 */
  static getReadMessageUsers(req, res) {
    const { groupName, messageID } = req.params;
    groupRef.child(groupName)
    .child('Messages')
    .child(messageID).child('Seen')
    .once('value', (users) => {
      res.status(200).json({
        message: 'Users in Group Sent',
        users,
        groupName,
        messageID
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Internal server error'
      });
    });
  }

}


module.exports = Message;
