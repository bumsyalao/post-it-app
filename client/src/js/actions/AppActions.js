import AppDispatcher from '../dispatcher/appDispatcher';
import AppConstants from '../constants/appConstants';

const AppActions = { 
    saveContact(contact){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_CONTACT,
            contact:contact
        })

    },

   receiveContact(contacts){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_CONTACT,
            contacts: contacts
        })

    },

    removeContact(contactId){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.REMOVE_CONTACT,
            contactId: contactId
        })

    },

    saveGroup(group){
        AppDispatcher.handleViewAction({
        actionType: AppConstants.SAVE_GROUP,
        group: group
      })
        
    }, 

    receiveGroup(groups){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_GROUP,
            groups: groups
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
            message: message
        })
        
    },
    receiveMessages(message){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_MESSAGE,
            message: message
        })

    },
     login(contact){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.SIGN_IN,
            contact:contact
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
     google(){
        AppDispatcher.handleViewAction({ 
            actionType: AppConstants.GOOGLE
            
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




}
module.exports = AppActions;