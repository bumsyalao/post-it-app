import React, {Component} from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'

export default class ResetPassword extends Component {
  render() {
    return (
      <div>
      <h1>Find your PostIt account</h1><br/>
      <h5>Enter your email address</h5><br/>
      <form onSubmit={this.handleSubmit.bind(this)}>
                 <div className='form-group'>
                    <input type="text" ref='email' className='form-control' placeholder='Email' required/>
                </div>           
                <button type='submit' className='btn btn-primary'>Search</button>              
     </form>
      </div>

    )
  }

  handleSubmit(e){
      e.preventDefault()
      const email = this.refs.email.value.trim()

       AppActions.resetPassword(email);
       this.refs.email.value = '';
  }
}