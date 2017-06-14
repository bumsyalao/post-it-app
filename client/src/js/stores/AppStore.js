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
    axios({
  method: 'post',
  url:'/user/signup',
  data: {
    username,
    email,
    password
  }
}).then(function(response){
  console.log(response)
  

}).catch(function(error){
    console.log(error);
    // this.signup.push({
    //   username,
    //   email,
    //   password
    // });
})
    this.emit('change');
  }



  handleActions(action) {
    switch (action.type) {
    case 'SIGN_UP':
      this.createUser(action.username, action.email, action.password);
      break;  
    }
    default:
  }
}

const appStore = new AppStore();

dispatcher.register(appStore.handleActions.bind(appStore));
window.dispatcher = dispatcher;
export default appStore;
