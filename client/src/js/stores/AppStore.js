import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/appDispatcher';
import AppConstants from '../constants/appConstants';
import assign from 'object-assign'
import AppAPI from '../utils/appAPI'

const CHANGE_EVENT = 'change'
let _contacts = [];
let _groups = [];



  const AppStore = assign({}, EventEmitter.prototype, {
    getContacts(){
      return _contacts;
    },
    saveContact(contact){
      _contacts.push(contact);
    },

    setContacts(contacts){
      _contacts = contacts;
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

      case AppConstants.RECEIVE_CONTACT:
        console.log('Receiving Contact...');
        //Store Save
        AppStore.setContacts(action.contacts);      
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
        AppStore.saveGroup(action.addUsers);
        // //Save to API
        AppAPI.saveGroupUser(action.addUsers)      
        //Emit Change
        AppStore.emit(CHANGE_EVENT);
        break;


    }

    return true;
  });

module.exports = AppStore;