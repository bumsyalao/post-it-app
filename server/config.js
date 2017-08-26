// Firebase Configuration
const firebase = require('firebase');

const config = {
  apiKey: process.env.DB_KEY,
  authDomain: process.env.DB_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.DB_ID,
  storageBucket: process.env.DB_STORAGE,
  messagingSenderId: process.env.DB_SENDER
};
firebase.initializeApp(config);

const firebaseAuth = firebase.auth();

const db = firebase.database();
const usersRef = db.ref('users');
const groupRef = db.ref('Groups');
const userGroupRef = db.ref('UserGroup');


const provider = new firebase.auth.GoogleAuthProvider();
module.exports = {
  firebase,
  db,
  usersRef,
  groupRef,
  userGroupRef,
  firebaseAuth,
  provider,
};
