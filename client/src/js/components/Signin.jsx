import React, { Component } from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import AppAPI from '../utils/appAPI'
import { firebaseAuth, firebase, provider } from '../../../../server/config'
import { validateEmail } from '../helpers/validate.helper';
import toastr from 'toastr';
import GoogleButton from 'react-google-button'
import GoogleWelcome from './GoogleWelcome'
import Welcome from './Welcome'


/**
 * Gets user data and persits with firebase
 * 
 * @export
 * @param {object} props
 * @class Signin
 * @extends {Component}
 */
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: AppStore.getAllEmails(),
      googleComponent: false,
      googleUser: AppStore.getGoogleSignup()      
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }


  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }


  onChange() {
    this.setState({
      emails: AppStore.getAllEmails(),
      googleUser: AppStore.getGoogleSignup()      
    });

  }

  /**
   * @method render
   * Render react component
   * 
   * @returns {String} The HTML markup for the Register
   * @memberof Signin
   */
  render() {
    if (!this.state.googleComponent) {
      var display =
          <div className='well col-md-8 col-md-offset-2'>
            <h3>Sign In</h3>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className='form-group'>
                <input type="text" ref='email' className='form-control' placeholder='Email' required />
              </div>
              <div className='form-group'>
                <input type="password" ref='password' className='form-control' placeholder='Password' required />
              </div>
              <div><a href="#/reset">Forgot Password?</a></div>
              <div><a href="#/register">Don't have an account? Signup</a></div>
              <button type='submit' onClick={this.addAlert} className='btn btn-primary'>Log in</button>
            </form>
            <GoogleButton className="google-button" onClick={this.handleGoogleSignin.bind(this)} />

          </div>

    } else {
      var display = < GoogleWelcome  />

    }
    return (
      <div className="row">
        <div className="col-sm-12">
            {display}
        </div>
      </div>

    )
  }


  /**
     * Makes an action call to Sign in a user with email and password
     * @param {object} e
     * @returns {void}
     * @memberof Signin
  */
  handleSubmit(e) {
    e.preventDefault();
    const contact = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    }


    if (validateEmail(this.refs.email.value.trim())) {
      AppActions.login(contact);
      this.refs.email.value = '';
      this.refs.password.value = '';
    } else {
      toastr.error('Invalid Email Address')
    }

  }

  /**
  * Makes an action call to Sign in a user with google account
  * @param {object} e
  * @returns {void}
  * @memberof Signin
*/
handleGoogleSignin(e) {
  e.preventDefault();
  
  const firstName = (username) => {
    let result;
    result = username.split(' ');
    return(result[0])
  }

  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      const { photoURL, uid, email } = result.user;
      const displayName = firstName(result.user.displayName);
      localStorage.setItem('photoURL', JSON.stringify(photoURL))
      const googleUser = {
        displayName,
        email,
        uid,
        photoURL
      }
      if (this.state.emails.includes(googleUser.email)){
        console.log(googleUser)
        AppActions.receiveLogin(googleUser);
        toastr.success('Welcome to PostIt')    
       } else {
        AppActions.google(googleUser);        
         this.setState({
          googleComponent: true
         })
       }
    });
}

}

export default Signin;