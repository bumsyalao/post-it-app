import Firebase from 'firebase'
import AppActions from '../actions/AppActions'
import axios from 'axios';

module.exports = {
    saveContact(contact){
        axios.post('/user/signup', {
            username: contact.name,           
            password: contact.phone,
            email: contact.email
            }).then(function (response) {
                console.log(response);
                
            }).catch(function (error) {
                console.log(error);
            });                  
    },

    getContacts(){
        axios.get('/user/database')
            .then(function (contacts) {
                console.log(contacts);
                AppActions.recieveContacts(contacts)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

