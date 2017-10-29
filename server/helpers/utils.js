import { firebase } from './../config';

/**
 * @function capitalizeFirstLetter
 *
 * @return { object } a string in lowercase and the First letter in Capital
 *
 * @param { String } character
 */
export const capitalizeFirstLetter = (character) => {
  const string = character.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};


export const sendNotification = (group, user, notification) => {
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
};

