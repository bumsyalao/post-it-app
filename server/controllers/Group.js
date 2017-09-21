const { usersRef, groupRef, firebase } = require('../config');
const { validStringContent, validStringLength } =
  require('../helpers/validate.helper');


/**
* class Group: controls all group routes
* @class
*/
class Group {
  /**
* @param {Object} req requset object
* @param {Object} res response object
* @return {Object} response containing the created group
*/
  static createGroup(req, res) {
    const { groupName, userName } = req.body;
    if (!(validStringLength(userName, groupName) &&
      validStringContent(userName, groupName))) {
      res.status(400).json(
        { message: 'The Username or Groupname field is invalid' }
      );
    } else {
      const db = firebase.database();
      groupRef.child(groupName).once('value', (snapshot) => {
        if (!snapshot.exists()) {
          groupRef.child(groupName).child('Users').child(userName)
            .set(userName);
          groupRef.child(groupName).child('Users').child('Bot').set('Bot');
          groupRef.child(groupName).child('Email').push('bot@postit.com');
          groupRef.child(groupName).child('Number').push('2348066098146');
          groupRef.child(groupName).child('Messages/Seen').push(null);

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
      }).catch((error) => {
        res.status(401).json(
          { message: `Something went wrong ${error.message}` }
        );
      });
    }
  }


  /**
 * @description: This method adds the user to a group
 * route: POST: /groups/:groupName
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing the added user
 */
  static addUserToGroup(req, res) {
    const { groupName, user } = req.body;
    if (!(validStringLength(groupName, user) &&
      validStringContent(groupName, user))) {
      res.status(400).json(
        { message: 'The Username or Groupname field is invalid' }
      );
    } else {
      const db = firebase.database();
      usersRef.child(user).once('value', (snapshot) => {
        if (snapshot.exists()) {
          const username = snapshot.val().userName;
          const email = snapshot.val().email;
          const number = snapshot.val().number;
          db.ref(`/users/${user}/Groups`).push({
            groupName
          });

          groupRef.child(groupName).once('value', (groupSnapshot) => {
            if (groupSnapshot.exists()) {
              groupRef.child(groupName).child('Users').child(username)
                .set(username);
              groupRef.child(groupName).child('Email').push(email);
              groupRef.child(groupName).child('Number').push(number);
            } else {
              res.status(403).json({ message: "Group dosen't exists" });
            }
          })
            .then(() => {
              res.status(201).json({ message: 'User added successfully' });
            });
        } else {
          res.status(403).json({ message: "The User dosen't exist" });
        }
      })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    }
  }


  /**
* @description: This method retrieves all groups the user belongs to
* route: GET: /group/:userName
* @param {Object} req request object
* @param {Object} res response object
* @return {Object} response containing all users nd messages of a group
*/
  static getGroups(req, res) {
    const userName = req.params.userName;
    const groups = [];
    let group = {};
    usersRef
      .child(userName)
      .child('Groups')
      .once('value', (snap) => {
        snap.forEach((data) => {
          group = {
            groupName: data.val().groupName
          };
          groups.push(group);
        });
        res.status(200).send(groups);
      });
  }

  /**
 * @description: This method retrieves all users and messages in a group
 * route: GET: /groups/:groupName
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response containing all users nd messages of a group
 */
  static usersAndMessagesInGroups(req, res) {
    const groupName = req.params.groupName;
    const userName = req.params.user;
    const messages = [];
    const users = [];
    const messageRef = firebase.database()
      .ref()
      .child('Groups')
      .child(groupName)
      .child('Messages')
      .limitToLast(10);
    messageRef.once('value', (snap) => {
      let message = {};
      snap.forEach((data) => {
        message = {
          id: data.key,
          user: data.val().user,
          text: data.val().Message,
          Time: data.val().Time,
          Priority: data.val().Priority
        };
        messages.push(message);
      });

      const userRef = firebase.database().ref()
      .child('Groups').child(groupName)
      .child('Users');
      userRef.once('value', (userSnapshot) => {
        let user = {};
        userSnapshot.forEach((data) => {
          user = {
            userName: data.val()
          };
          users.push(user);
        });

        res.status(200).json({
          message: `Getting Messages and Users in ${groupName} database`,
          messages,
          users
        });
      });
    });
    const messageIDRef = firebase.database()
    .ref()
    .child('Groups')
    .child(groupName)
    .child('Messages');
    messageIDRef.once('value', (snap) => {
      const messageIDs = [];
      snap.forEach((data) => {
        messageIDs.push(data.key);
      });
      messageIDs.forEach((entry) => {
        const db = firebase.database();
        db.ref(`/Groups/${groupName}/Messages/${entry}`).child('Seen')
        .child(userName).set(userName);
      });
    });
  }

}


module.exports = Group;
