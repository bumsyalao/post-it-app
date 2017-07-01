import React, {Component} from 'react'
import AppActions from '../actions/AppActions' 
import AppStore from '../stores/AppStore'
import {firebaseAuth, firebase}from '../../../../server/config'


export default class Signup extends Component {
    state={
    
  }
 constructor(props) {
    super(props);
    this.state = {
      contacts: AppStore.getContacts()
    };

		// Bind Form values
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 render() { 
    return (  
        <div className='well'>  
            <h3>Sign Up</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group'>
                    <input type="text" ref='username' className='form-control' placeholder='Username' required/>
                </div>
                 <div className='form-group'>
                    <input type="email" ref='email' className='form-control' placeholder='Email' required/>
                </div>
                 <div className='form-group'>
                    <input type="password" ref='password' className='form-control' placeholder='Password' pattern="(?=.*\d).{6,}" title="Must contain at least 6 characters and 1 number"  required/>
                </div>              
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            <h3>Login With Google Account</h3>
            <button onClick={this.handleGoogle.bind(this)}>Login with Gooogle</button>
        </div>

    )
  }

   handleGoogle(e){
      e.preventDefault();  
      AppActions.google();
    
   }
 

  handleSubmit(e){
      e.preventDefault();    
      const contact = {
          username: this.refs.username.value.trim(),
          email: this.refs.email.value.trim(),
          password: this.refs.password.value.trim()
      }
    const allUser = this.state.contacts.map((user, index) =>  user.username)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const Uppercase = capitalizeFirstLetter(contact.username)



    if (allUser.indexOf(Uppercase) === -1) {
        AppActions.saveContact(contact);
        alert('Welcome, '+Uppercase+ '  An email has been sent to you') 
        
         this.refs.username.value = '';
         this.refs.email.value = '';
         this.refs.password.value = '';    
    }
    else {
        alert("The username already exist")
        console.log("element found");
    }


}

   _onChange(){
        this.setState({contacts: AppStore.getContacts()});
      
    }   
}
