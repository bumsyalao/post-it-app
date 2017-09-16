const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyDx5Xi4OxL1F18jqNO1L1JyAhO8CM3J3h0',
  authDomain: 'post-it-app-8b2cb.firebaseapp.com',
  databaseURL: 'https://post-it-app-8b2cb.firebaseio.com',
  projectId: 'post-it-app-8b2cb',
  storageBucket: 'post-it-app-8b2cb.appspot.com',
  messagingSenderId: '852510559801'

  // apiKey:'AIzaSyCRLL-G7K1KUz8JUOHH4iI0cq5YiXwnQpo',    
  // authDomain: 'mock-94a34.firebaseapp.com',  
  // databaseURL: 'https://mock-94a34.firebaseio.com ',   
  // projectId: 'mock-94a34',   
  // storageBucket: 'mock-94a34.appspot.com',    
  // messagingSenderId: '51009272799'
};

firebase.initializeApp(config);

const firebaseAuth = firebase.auth();

const db = firebase.database();
const usersRef = db.ref('users');
const groupRef = db.ref('Groups');

const provider = new firebase.auth.GoogleAuthProvider();
module.exports = {
  firebase,
  db,
  usersRef,
  groupRef,
  firebaseAuth,
  provider,
};
