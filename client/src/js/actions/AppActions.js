import AppDispatcher from '../dispatcher/appDispatcher';
import AppConstants from '../constants/appConstants';

const AppActions = { 
    saveContact(contact){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_CONTACT,
            contact
        })

    },

   receiveContact(contacts){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_CONTACT,
            contacts
        })

    },

    removeContact(contactId){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.REMOVE_CONTACT,
            contactId
        })

    },

    saveGroup(group){
        AppDispatcher.handleViewAction({
        actionType: AppConstants.SAVE_GROUP,
        group
      })
        
    }, 

    receiveGroup(groups){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_GROUP,
            groups
        })

    },

    saveGroupUser(addUser){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_GROUP_USER,
            addUser
        })
        
    },

     saveMessage(message){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SAVE_MESSAGE,
            message
        })
        
    },
    receiveMessages(message){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_MESSAGE,
            message
        })

    },
     login(contact){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SIGN_IN,
            contact
        })
        
    },
      receiveLogin(user){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.RECEIVE_LOGIN,
            user
        })
        
    },
      searchUserMessage(keyName){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SEARCH_USER_MESSAGE,
            keyName
        })
           
    }, 
     google(googleUser){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.GOOGLE,
            googleUser
            
        })
        
    },
      logout(){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.LOGOUT
            
        })
        
    },
       receiveUserMessage(users){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_USER_MESSAGE,
            users
        })

    },

       displayName(displayName){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.DISPLAY_NAME,
            displayName
        })

    },
       resetPassword(email){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RESET_PASSWORD,
            email
        })

    },




}
module.exports = AppActions;