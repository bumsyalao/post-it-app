import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class AppStore extends EventEmitter {
  constructor() {
    super();
    this.signup = [{
      username: 'w',
      email: 'rr',
      password: 'er'
    },];
  }

  getAll () {
    return this.signup;
  }

  createUser(username, email, password) {
    this.signup.push({
      username,
      email,
      password
    });

    this.emit('change');
  }


  handleActions(action) {
    switch (action.type) {
    case 'SIGN_UP':
      this.createUser(action.data);
      break;  
    }
  }
}

const appStore = new AppStore();
window.appStore = appStore;
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;
