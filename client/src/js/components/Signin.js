import React, { Component } from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import AppAPI from '../utils/appAPI'
import { firebaseAuth, firebase, provider } from '../../../../server/config'
import toastr from 'toastr';


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
      email: '',
      password: ''
    };


    // Bind Form values
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @method render
   * Render react component
   * 
   * @returns {String} The HTML markup for the Register
   * @memberof Signin
   */
  render() {
    return (
      <div>
        <div className='well col-md-8 col-md-offset-2'>
          <h3>Sign In</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='form-group'>
              <input type="email" ref='email' className='form-control' placeholder='Email' required />
            </div>
            <div className='form-group'>
              <input type="password" ref='password' className='form-control' placeholder='Password' />
            </div>
            <div><a href="#/reset">Forgot Password?</a></div>

            <button type='submit' onClick={this.addAlert} className='btn btn-primary'>Log in</button>
          </form>
        </div>

        {/*<div className='well' style={{float:'right'}}>  
          <h3>Login With Google Account</h3>
            <button onClick={this.handleGoogle.bind(this)}>Login with Gooogle</button>
        </div>*/}

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
      toastr.error('Invalid Email Address')
    }

  }

  /**
  * Makes an action call to Sign in a user with google account
  * @param {object} e
  * @returns {void}
  * @memberof Signin
*/
  handleGoogle(e) {
    e.preventDefault();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(user)
        if (user) {
          firebase.auth().onAuthStateChanged(() => {
            const googleUser = {
              userName: user.email
            }

            AppActions.googleLogin(user.displayName);
          });
        }
      });
  }

}

export default Signin;