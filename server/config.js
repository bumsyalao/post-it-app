// Firebase Configuration
const firebase = require('firebase');
const nodeEnv = process.env.NODE_ENV || 'development';
let prefix = '';

if (nodeEnv === 'test') {
  prefix = 'TEST_'; 
}

const config = {
  apiKey: process.env[`${prefix}DB_KEY`],
  authDomain: process.env[`${prefix}DB_DOMAIN`],
  databaseURL: process.env[`${prefix}DB_URL`],
  projectId: process.env[`${prefix}DB_ID`],
  storageBucket: process.env[`${prefix}DB_STORAGE`],
  messagingSenderId: process.env[`${prefix}DB_SENDER`]
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
