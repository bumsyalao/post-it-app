import AppActions from '../actions/AppActions'
import axios from 'axios';
import firebase from '../../../../server/config'
 
module.exports = {
    saveContact(contact){
        axios.post('/user/signup', {
            username: contact.username,                     
            email: contact.email,
            password: contact.password
            }).then((response) => {
                console.log(response.data)
            const user = response.data; 
             
             AppActions.receiveLogin(user)
            
            }).catch(function (error) { 
                console.log(error);
            });                  
    },

    getContacts(){
        axios.get('/user/database')
            .then(function (contacts) {
                
                AppActions.receiveContact(contacts.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    saveGroup(group){
        axios.post('/group', {
            groupname:group                   
            }).then(function (response) {
                console.log(response);              
            }).catch(function (error) {
                console.log(error);
            });                  
    },

     getGroups(){
        axios.get('/group/database')
            .then((groups) => {
                // console.log(groups)
                AppActions.receiveGroup(groups.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },
     saveGroupUser(addUsers){
       const groupID = addUsers.groupID
       const uid = addUsers.uid
        axios.post('/group/'+ groupID +"/"+uid)
        .then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
    saveMessages(message){
       const groupID = message.group;
        // const groupID = addUsers.groupID
       const user = message.user;
       const text = message.text;
        axios.post('/messages/'+ groupID +"/"+user+"/"+text)
        .then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
      getMessages(){
          const groupID = 'Andela'
        axios.get('/messages/'+groupID+'/messages')
            .then((message) => {
                AppActions.receiveMessages(message.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

     login(contact){
        axios.post('/user/signin', {               
            email: contact.email,
            password: contact.password
            }).then(function (response) {
                // console.log('signin ing')
               const user = response.data.userData; 
             
             AppActions.receiveLogin(user)
               
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
     google(){
        //  console.log('rar')
        // axios.post('/user/google', {               
        //     }).then(function (response) {
                         
        //     }).catch(function (error) {
        //         console.log(error);
        //     });                  
    },


                
    

};

