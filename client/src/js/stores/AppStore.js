import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/appDispatcher';
import AppConstants from '../constants/appConstants';
import assign from 'object-assign'
import AppAPI from '../utils/appAPI'

const CHANGE_EVENT = 'change'
let _contacts = [];



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

    }

    return true;
  });

module.exports = AppStore;