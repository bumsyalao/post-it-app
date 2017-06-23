import Firebase from 'firebase'
import AppActions from '../actions/AppActions'
import axios from 'axios';
 
module.exports = {
    saveContact(contact){
        axios.post('/user/signup', {
            username: contact.username,                     
            email: contact.email,
            password: contact.password
            }).then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },

    getContacts(){
        axios.get('/user/database')
            .then(function (contacts) {
                console.log(contacts.data);
                AppActions.recieveContacts(contacts.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

