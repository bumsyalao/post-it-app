import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/appDispatcher';
import AppConstants from '../constants/appConstants';
import assign from 'object-assign'
import AppAPI from '../utils/appAPI'

const CHANGE_EVENT = 'change'

    let _user = [];
    let _authed = false;
    let _currentGroup = '';
    let _messages = [];  
    let _groups = [];
    let _groupUsers = []
 

  const AppStore = assign({}, EventEmitter.prototype, {

    getAuthed(){
      return _authed;
    },

      // If there is a user in local storage, set authentication true
     setAuthed(){
      _authed = true;
    },
    setLogout(){
      _authed = false;
      localStorage.clear()
    },

    getUser(){
      return _user;
    },

    saveUser(user){
      _user.push(user);
      localStorage.setItem(
        'user', JSON.stringify(user)
      )
    },

    setUser(user){
      _user = user;
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


    getCurrentGroup(){
      return _currentGroup;
    },

    setCurrentGroup(keyName){
      _currentGroup = keyName;
    },



    getGroupUsers(){
      return _groupUsers;
    },
    saveGroupUsers(users){
      _groupUsers.push(users);
    },

    setGroupUsers(users){
      _groupUsers = users;
    },
    
    getMessages(){
      return _messages;
    },
    saveMessages(message){
      _messages.push(message);
    },

    setMessages(messages){
      _messages = messages;
    },

    removeContact(contactId){
      var index = _contacts.findIndex(x => x.id === contactId);
      _contacts.splice(index, 1)
      
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



      case AppConstants.SAVE_GROUP:
        console.log('Saving group...');
         //Store Save
        AppStore.saveGroup(action.group);
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

      case AppConstants.SAVE_GROUP_USER:
        console.log('Saving user into group...');
        
         //Store Save
        AppStore.saveGroup(action.addUser);
        // //Save to API
        AppAPI.saveGroupUser(action.addUser)      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.SAVE_MESSAGE:
        console.log('Saving Message...');
        //Store Save
        AppStore.saveMessages(action.message);
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

      case AppConstants.SIGN_IN:
   
        //Save to API
        AppAPI.login(action.contact)
        
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_LOGIN:
         //Store Save
        AppStore.saveUser(action.user);
        AppStore.setAuthed();
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
        // //Store Save
        // AppStore.saveMessages(action.message);
        //Save to API
        AppAPI.google()
        // //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.SEARCH_USER_MESSAGE:
        console.log('Searching for Users and Message...');

         AppStore.setCurrentGroup(action.keyName);          
         //Save to API
        AppAPI.searchUserMessage(action.keyName)
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;

      case AppConstants.RECEIVE_USER_MESSAGE:
        console.log('Receiving Users and Message...');
 
        AppStore.setGroupUsers(action.users);      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;
    }

    return true;
  });

module.exports = AppStore;