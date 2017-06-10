import React, { Component } from 'react';
import AppStore from '../stores/AppStore'


function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

//1
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      signup : AppStore.getAll()
    }
  }

  componentWillMount() {
    TodoStore.on('change', () => {
      this.setState({
        signup : AppStore.getAll()

      })
    })
  }
//2
  handleSubmit = (e) => {
    e.preventDefault()
    
    const { signup } = this.state;
   
    console.log(signup.username)
  }

//3
    render() {
        return (
            <div>
              <section>
                <div>
                  <h2>Signup Form</h2>
                    <form onSubmit={this.handleSubmit} style={{border: '1px solid #ccc'}}>
                      <div className="container">

                        <label><b>Username</b></label>
                        <input type="text" placeholder="Username" name="username" ref={(username) => this.username = username}/>

                        <label><b>Email</b></label>
                        <input type="text" placeholder="Email" name="email" ref={(email) => this.email = email} />

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Password" name="psw" ref={(password) => this.password = password}/>
                       

                          {
                        this.state.registerError &&
                        <div className="alert alert-danger" role="alert">
                          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                          <span className="sr-only">Error:</span>
                          &nbsp;{this.state.registerError}
                        </div>
                          }
                        
                        <div className="clearfix">              
                          <button type="submit"  className="btn btn-primary">Sign Up</button>    
                        </div>
                      </div>
                    </form>
                  </div>
              </section>
            </div>
        )
    }

}


export default Signup;