import React, {Component} from 'react'
import AppActions from '../actions/AppActions' 
import AppStore from '../stores/AppStore'
import GoogleWelcome from './GoogleWelcome'
import {firebaseAuth, firebase, provider}from '../../../../server/config'


export default class Signup extends Component {
 constructor(props) {
    super(props);
    this.state = {
      contacts: AppStore.getContacts(),
       databaseUsers: AppStore.getdatabaseUsers(),
       emails: AppStore.getGroupEmails(),
       numbers: AppStore.getAllUsersNumber(),
       googleUser: AppStore.getGoogleSignup()

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
     console.log(this.state.googleUser)   
     if (this.state.googleUser){
         var display = <GoogleWelcome />
     } else {
         var display = <div>
                        <h3>Sign Up</h3>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className='form-group'>
                                <input type="text" ref='username' className='form-control' placeholder='Username' required/>
                            </div>
                            <div className='form-group'>
                                <input type="email" ref='email' className='form-control' placeholder='Email' required/>
                            </div>
                            <div className='form-group'>
                                <input type="text" ref='number' className='form-control' placeholder='Phone Number: Ex 2348066098146' pattern="[234][0-9]{12}" title="It will contain only 13 numbers and must start with 234" required/>
                            </div>
                            <div className='form-group'>
                                <input type="password" ref='password' className='form-control' placeholder='Password' pattern="(?=.*\d).{6,}" title="Must contain at least 6 characters and 1 number"  required/>
                            </div>              
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>

                          <div className='well' style={{float:'right'}}>  
                                <h3>Login With Google Account</h3>
                                    <button onClick={this.handleGoogle.bind(this)}>Login with Gooogle</button>
                         </div>

         </div>
     }
    return (  
        <div className='well'>  
            {display}
            
        </div>

    )
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
          password: this.refs.password.value.trim(),
          number: this.refs.number.value.trim()
      }

      // Checks if Username and Phone number already exist
    if (this.state.databaseUsers.includes(Uppercase)){
     alert("The username already exist")  
    }else if(this.state.numbers.includes(this.refs.number.value)){
        alert("The phone number already exist")
     }else {      
        AppActions.saveContact(contact);

        this.refs.username.value = '';
         this.refs.email.value = '';
         this.refs.password.value = ''; 
         this.refs.number.value = ''; 
    }
}


   handleGoogle(e){
      e.preventDefault();      
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        if (user) {
          firebase.auth().onAuthStateChanged(() => {
            const googleUser = {
               username: user.displayName,
               email: user.email,
               uid: user.uid
            }
            AppActions.google(googleUser);
          });
        }
      });   
   }

   _onChange(){
        this.setState({databaseUsers: AppStore.getdatabaseUsers()});
        this.setState({emails: AppStore.getGroupEmails()});
        this.setState({numbers: AppStore.getAllUsersNumber()});
        this.setState({googleUser: AppStore.getGoogleSignup()});
        
                     
    } 


}
