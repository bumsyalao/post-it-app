import React, { Component } from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import AppAPI from '../utils/appAPI'
import {firebaseAuth, firebase, provider}from '../../../../server/config'



class Signin extends Component {
 constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };


		// Bind Form values
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  render() {
    return (
      <div>  
           <div className='well'style={{float:'left'}} >  
            <h3>Sign In</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
                 <div className='form-group'>
                    <input type="email" ref='email' className='form-control' placeholder='Email' required/>
                </div>
                 <div className='form-group'>
                    <input type="password" ref='password' className='form-control' placeholder='Password' />
                </div>  
              <div><a href="#/reset">Forgot Password?</a></div>            
                <button type='submit' className='btn btn-primary'>Log in</button>              
            </form>
        </div>

           <div className='well' style={{float:'right'}}>  
          <h3>Login With Google Account</h3>
            <button onClick={this.handleGoogle.bind(this)}>Login with Gooogle</button>
        </div>

      </div>

    )
  }

   handleSubmit(e){
      e.preventDefault(); 
       const contact = {
          email: this.refs.email.value.trim(),
          password: this.refs.password.value.trim()
      }
        // Validate Email Address
      function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }  

      if (validateEmail(this.refs.email.value.trim())) {
        AppActions.login(contact);
         this.refs.email.value = '';
        this.refs.password.value = '';
      } else {
        alert('Invalid Email Address')
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

}

export default Signin;