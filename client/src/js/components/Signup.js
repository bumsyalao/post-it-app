import React, {Component} from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import Verify from './Verify'


export default class Signup extends Component {
    state={
    contacts: AppStore.getContacts()
  }
 render() { 
       console.log(this.state.contacts) 
   
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
                    <input type="password" ref='password' className='form-control' placeholder='Password' pattern="(?=.*\d).{6,}" title="Must contain at least 6 characters"  required/>
                </div>              
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>

    )
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
        console.log("element doesn't exist");
        AppActions.saveContact(contact);
        alert('Welcome, '+Uppercase+'. You have successful signed up')      
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
