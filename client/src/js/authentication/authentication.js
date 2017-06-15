import {usersRef, firebaseAuth, groupRef} from '../firebase/firebase';
import axios from 'axios';

// SignUp 
export const signup = (username, email, password) => {
  return axios.post('/user/signup', {
    username,
    email,
    password
  })
};


// SignIn 
export const login = (email, password) => {
   axios.post('/user/signin', {
    email,
    password
  })
};


// Logout
export const logout = () => {
  axios.post('/user/signout')
};



// Create Group
export const group = (groupID) => {

  axios.post('/group', {
    groupID
  })
};

// export const addUser = (groupID) => {   const groupID = req.params.groupID;
//  // Firebase get all users     const uid = req.params.uid;     usersRef
// .child(uid)     .once('value', (snapshot) => {       const userEmail =
// snapshot.exists() ? snapshot       .val()       .email : 'No email';
// groupRef       .child(groupID)       .child('users')       .push(userEmail)
//     .then(() => {         res.send('User added successfully');       });
// })  .catch((err) => {    res.send(err);  });   };


//  Reset Password
// export const resetPassword = (email) => {
//   return firebaseAuth().sendPasswordResetEmail(email);
// };


// export const saveUser = (user) => {
//   return ref
//     .child(`users/${user.uid}/info`)
//     .set({email: user.email, uid: user.uid})
//     .then(() => user);
// };