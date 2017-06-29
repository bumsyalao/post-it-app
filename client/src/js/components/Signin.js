import React, { Component } from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import AppAPI from '../utils/appAPI'



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
   <div className='well'>  
            <h3>Sign In</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
                 <div className='form-group'>
                    <input type="text" ref='email' className='form-control' placeholder='Email' required/>
                </div>
                 <div className='form-group'>
                    <input type="password" ref='password' className='form-control' placeholder='Password' />
                </div>              
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
  }

   handleSubmit(e){
      e.preventDefault();    
      const contact = {
          email: this.refs.email.value.trim(),
          password: this.refs.password.value.trim()
      }
      AppActions.login(contact);
        this.refs.email.value = '';
        this.refs.password.value = '';
      // this.props.history.push('/dasboard');

}
}

export default Signin;