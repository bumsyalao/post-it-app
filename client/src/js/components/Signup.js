import React, {Component} from 'react'
import AppActions from '../actions/AppActions' 
import AppStore from '../stores/AppStore'
import {firebaseAuth, firebase}from '../../../../server/config'


export default class Signup extends Component {
 constructor(props) {
    super(props);
    this.state = {
      contacts: AppStore.getContacts(),
       databaseUsers: AppStore.getdatabaseUsers() 
    };
     this._onChange= this._onChange.bind(this)
  }

   componentDidMount(){
        AppStore.addChangeListener(this._onChange);
    }

    componentUnmount(){
        AppStore.removeChangeListener(this._onChange);
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
    //   AppActions.google();
    console.log('ee')
    
   }
 

  handleSubmit(e){
      e.preventDefault();  
      
   // Function to convert first letter of each word to capital letter   
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   } 

    // Implements the function
const Uppercase = capitalizeFirstLetter(this.refs.username.value)

   const contact = {
          username: Uppercase,
          email: this.refs.email.value.trim(),
          password: this.refs.password.value.trim()
      }

 if (this.state.databaseUsers.includes(Uppercase)){
     alert("The username already exist")  
    }else {
       alert('Welcome, '+Uppercase+ '  An email has been sent to you') 
        AppActions.saveContact(contact);
        
    this.refs.username.value = '';
         this.refs.email.value = '';
         this.refs.password.value = ''; 

    }

}

   _onChange(){
        this.setState({databaseUsers: AppStore.getdatabaseUsers()});      
    } 


}
