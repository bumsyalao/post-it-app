import React, { Component } from 'react';

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';

/**
 * @description Resets the password of a user
 *
 * @class ResetPassword
 * 
 * @extends {Component}
 */
export default class ResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: ''

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
    * @description: controls inputs state
    *
    * @param {object} element the current element
    *
    * @return {void} void
    */
    handleChange(element) {
      this.setState({
          [element.target.name]: element.target.value
      });
    }

      /**
     * @description Makes an Api Action to Reset Password
     *
     * @param {any} event
     * 
     * @memberof ResetPassword
     */
    handleSubmit(event) {
      event.preventDefault();
      const email = this.state.email
      AppActions.resetPassword(email);
    }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className="col-md-3"></div>

          <div className='col-sm-12 col-md-6'>
            <h2>Reset your PostIt Password</h2><br />
            <h4>Enter your email address</h4><br />

            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input
                  type="email"
                  name='email'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Email'
                  required />
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            <br />
            <div>
              <a href="#/login">Back to Log in</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}