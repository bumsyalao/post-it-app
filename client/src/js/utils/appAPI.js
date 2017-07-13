import AppActions from '../actions/AppActions'
import axios from 'axios';
import firebase from '../../../../server/config'
 
module.exports = {
    saveContact(contact){
        axios.post('/user/signup', {
            username: contact.username,                     
            email: contact.email,
            password: contact.password,
            number: contact.number
        }).then((response) => {
            const user = response.data; 

            if (response.data.message == 'The email address is already in use by another account.') {
                    alert(response.data.message)
            }else{
                
                    AppActions.receiveLogin(user)
                   
            }
             
            
            }).catch(function (error) { 
                console.log(error);
            });                  
    },

    // Get all Contacts from database, this will use for validation
    getContacts(){
        axios.get('/users/allusers')
            .then(function (contacts) {
                
                AppActions.receiveContact(contacts.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    saveGroup(group){
        axios.post('/group', {
            groupName: group.groupName,
            userName: group.userName
            }).then(function (response) {
                alert(response.data);              
            }).catch(function (error) {
                console.log(error);
            });                  
    },

     getGroups(){
        axios.get('/user/database')
            .then((group) => {
                // console.log(groups)
                const groups = group.data
                AppActions.receiveGroup(groups)
                console.log(groups)
            
            })
            .catch(function (error) {
                console.log(error);
            });
    },
     saveGroupUser(addUser){
       const groupName = addUser.groupname;
       const user = addUser.user;
        axios.post('/group/'+ groupName +"/"+user)
        .then(function (response) {
                alert(response.data);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
    saveMessages(message){
       const groupName = message.group;
        // const groupID = addUsers.groupID
       const messages = message.text;
       const emails = message.emails;
        const numbers = message.numbers;
        axios.post('/groups/'+ groupName +"/"+messages+"/"+emails+"/"+numbers)
        .then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },

      getMessages(keyName){
        const groupName = keyName;
        axios.get('/groups/'+groupName)
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
               const user = response.data.userData;
               
             AppActions.receiveLogin(user)
               
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },
     setLogout(){
        axios.post('/user/signout').then(function (response) {
              
             
             console.log(response)
               
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },

    searchUserMessage(keyName){
        const groupName = keyName
        axios.get('/group/'+groupName)
            .then((users) => {  
                const user = users.data.Users
                const email = users.data.Email
                const number = users.data.Number
                console.log(user)
                console.log(email)
                console.log(number)
                                    
            AppActions.receiveUserMessage(user)
            AppActions.receiveEmails(email)
            AppActions.receiveNumbers(number)
           })
            .catch(function (error) {
                console.log(error);
            });
    },


     google(googleUser){
        axios.post('/user/google', { googleUser            
            }).then(function (response) {
                const user = response.data
                AppActions.receiveLogin(user)
            }).catch(function (error) {
                console.log(error);
            });                  
    },

    resetPassword(email){
        axios.post('/user/reset', { email           
        }).then(function (response) {
            alert(response.data)
            }).catch(function (error) {
                console.log(error);
            });                  
    },


                
    

};

