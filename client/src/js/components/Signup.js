import React, {Component} from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'


export default class Signup extends Component {
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
                    <input type="password" ref='password' className='form-control' placeholder='Password'  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
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
      alert('SignUp Successful')      
      AppActions.saveContact(contact);

  }
}
