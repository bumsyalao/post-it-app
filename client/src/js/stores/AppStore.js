import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import assign from 'object-assign'
import AppAPI from '../utils/appAPI'

const CHANGE_EVENT = 'change'

    let _user = '';
    const localStorage = null;
    let _auth = false;
    let _contacts = [];
    let _currentGroup = '';
    let _messages = [];  
    let _groups = [];
    let _groupUsers = [];
    let _groupEmails = [];
    let _groupNumbers = [];
    let _databaseUsers = [];
    let _notification = [];
    let _personalMessage = [];
    let _allUsersNumber = [];
    let _archiveMessage = [];
    let _openArchive = 'inbox';
    let _seenUsers = [];
    let _googleSignup = null;

const AppStore = assign({}, EventEmitter.prototype, {

  getAuth() {
    return _auth;
  },

    // If there is a user in local storage, set authentication true
    setAuth(){
        _auth = true;
  },
  
  setLogout(){
    _auth = false;
    localStorage.clear()
  },

  getUser(){
    return _user;
  },

  saveUser(user){
    _user = user;
    
  },

  setUser(user){
    _user = user;
  },

  getContacts(){
    return _contacts;
  },
  saveContact(contact){
    _contacts.push(contact);
  },

  setContacts(contacts){
    _contacts = contacts;
  },

  // Get All Users in the database
  getAllUsersNumber(){
    return _allUsersNumber;
  },
  setAllUsersNumber(number){
    _allUsersNumber = number;
  },

    
  getdatabaseUsers(){
    return _databaseUsers;
  },

  setdatabaseUsers(contacts){
    _databaseUsers = contacts;
  },

      // Get the Current User who signed up with Google
  getGoogleSignup(){
    return _googleSignup;
  },

  setGoogleSignup(googleUser){
    _googleSignup = googleUser;
  },

  getGroups(){
    return _groups;
  },
  saveGroup(group){
    _groups.push(group);
  },

  setGroups(groups){
    _groups = groups;
  },

  // Get the Current Group When the User has Clicked on A Group
  getCurrentGroup(){
    return _currentGroup;
  },

  setCurrentGroup(keyName) {
    _currentGroup = keyName;
  },


  // Get Users in a Group
  getGroupUsers(){
    return _groupUsers;
  },
  saveGroupUsers(users){
    _groupUsers.push(users);
  },

  setGroupUsers(users){
    _groupUsers = users;
  },


      // Get Emails in a Group
  getGroupEmails(){
    return _groupEmails;
  },

  setGroupEmails(emails){
    _groupEmails = emails;
  },

      // Get Numbers in a Group
  getGroupNumbers(){
    return _groupNumbers;
  },

  setGroupNumbers(numbers){
    _groupNumbers = numbers;
  },


  // Get Messages
  getMessages(){
    return _messages;
  },
  saveMessages(message){
    _messages.push(message);
  },
  setMessages(messages){
    _messages = messages;
  },

  // Get Notification
  getNotification(){
    return _notification;
  },
  saveNotification(notify){
    _notification.push(notify);
  },
  setNotification(notify){
    _notification = notify;
  },

  // Get Personal Message
  getPersonalMessage(){
    return _personalMessage;
  },
  savePersonalMessage(message){
    _personalMessage.push(message);
  },

  setPersonalMessage(message){
    _personalMessage = message;
  },
  
  removeMessage(messageId){
    var index = _personalMessage.findIndex(x => x.id === messageId);
    _personalMessage.splice(index, 1)
    
  },

    // Get Archive Message
  getArchiveMessage(){
    return _archiveMessage;
  },
  saveArchiveMessage(message){
    _archiveMessage.push(message)
  },

  setArchiveMessage(message){
    _archiveMessage = message;
  },

      // Get Archive Message
  getSeenUsers(){
    return _seenUsers;
  },

  setSeenUsers(users){
    _seenUsers = users;
  },

  // Open and Close Archive link
  getOpenArchive(){
    return _openArchive;
  },
  openArchive(){
    _openArchive = 'archive'
  },
  closeArchive(){
    _openArchive = 'inbox'
  },
  openGroup(){
    _openArchive = 'group'
  },

  emitChange(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener(callback){
    this.on('change', callback);
  },

  removeChangeListener(callback){
    this.removeListener('change', callback)
  }

});

  AppDispatcher.register((payload) => {
    const action = payload.action;

    switch(action.actionType){

      case AppConstants.SAVE_CONTACT:
        console.log('Saving Contact...');
        //Store Save
        AppStore.saveContact(action.contact);
        //Save to API
        AppAPI.saveContact(action.contact)
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_CONTACT:
        console.log('Receiving Contact...');        
        //Store Save
        AppStore.setdatabaseUsers(action.contacts);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_ALLUSERS_NUMBER:
        console.log('Receiving all the numbers in a the database...');        
        //Store Save
        AppStore.setAllUsersNumber(action.number);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;


      case AppConstants.SAVE_GROUP:
        console.log('Saving group...');

        // //  //Store Save
        AppStore.saveGroup(action.group);   
        console.log(action.group) 
        // //Save to API
         AppAPI.saveGroup(action.group)      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_GROUP:
        console.log('Receiving Groups...');
        //Store Save
             
        AppStore.setGroups(action.groups);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_NOTIFICATION:
        console.log('Receiving NOTIFICATION...');
        //Store Save            
        AppStore.setNotification(action.notification);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_PERSONAL_MESSAGE:
        console.log('Receiving Personal Message...');
        //Store Save            
        AppStore.setPersonalMessage(action.message);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.SAVE_GROUP_USER:
        console.log('Saving user into group...');
        
        //  //Store Save
        // AppStore.saveGroup(action.addUser);
        // //Save to API
        AppAPI.saveGroupUser(action.addUser)      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.SAVE_MESSAGE:
        console.log('Saving Message...');
        //Store Save
        AppStore.savePersonalMessage(action.message);
        
        //Save to API
        AppAPI.saveMessages(action.message)
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_MESSAGE:
        console.log('Receving Message...');
        //Store Save
        AppStore.setMessages(action.message);
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.REMOVE_MESSAGE:
        console.log('Removing Message...');
          AppStore.saveArchiveMessage(action.messageId)        
          AppStore.removeMessage(action.messageId.id);
        console.log(action.messageId)
        
         AppAPI.removeMessage(action.messageId.id)
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.ARCHIVE_MESSAGE:
        console.log('Receving Archives...');        
        AppStore.setArchiveMessage(action.message);
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.SEEN_MESSAGE:
        console.log('User who have seen message..');        
        AppAPI.seenMessage(action.user);
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_SEEN_USERS:
        console.log('Receiving users who have seen message..');        
        AppStore.setSeenUsers(action.users);
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.OPEN_ARCHIVE:
        console.log('Opening Archives...');        
        AppStore.openArchive();
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.CLOSE_ARCHIVE:
        console.log('Closing Archives...');        
        AppStore.closeArchive();
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.UPDATE_INBOX:
        console.log('Updating Inbox...');        
        AppAPI.updateInbox(action.user);
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;


      case AppConstants.SIGN_IN:  
        //Save to API
        AppAPI.login(action.contact)
        
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_LOGIN:
         //Store Save
        AppStore.saveUser(action.user);
        AppStore.setAuth();
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.LOGOUT:
        AppStore.setLogout();
        // //Emit Change
         //Save to API
        AppAPI.setLogout()
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.GOOGLE:
        console.log('Google Signing Up...');
        AppStore.setGoogleSignup(action.googleUser);   
        // //Save to API
         AppAPI.google(action.googleUser)
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.GOOGLE_LOGIN:
        console.log('Google LOGIN...');
         AppAPI.googleLogin(action.googleUser)
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.SEARCH_USER_MESSAGE:
        console.log('Searching for Users and Message...');

         AppStore.setCurrentGroup(action.keyName); 
         AppStore.openGroup()         
         //Save to API
        AppAPI.searchUserMessage(action.keyName)
         //Save to API
        AppAPI.getMessages(action.keyName)
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_USER_MESSAGE:
        console.log('Receiving Users and Message...'); 
        AppStore.setGroupUsers(action.users);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_EMAILS:
        console.log('Receiving Emails in a group...'); 
        AppStore.setGroupEmails(action.emails);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_NUMBERS:
        console.log('Receiving Numbers in a group...'); 
        AppStore.setGroupNumbers(action.numbers);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

        
      case AppConstants.RESET_PASSWORD:
        console.log('Reseting Password...');

        //Save to API
        AppAPI.resetPassword(action.email)     
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.NOTIFICATION:
        console.log('Saving Notification...');
        //Store Save
        AppStore.saveNotification(action.notify);
        
        //Save to API
        AppAPI.saveNotification(action.notify)
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;





    }

    return true;
  });

module.exports = AppStore;