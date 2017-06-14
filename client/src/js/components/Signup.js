import React, { Component } from 'react';
import AppActions from '../actions/AppActions'
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
    AppStore.on('change', () => {
      this.setState({
        signup : AppStore.getAll()
      })
    }) 
  }
//2
  createUser(){
    AppActions.createUser(username,email,password);
  }


//3
    render() {
        return (
            <div>
              <section>
                <div>
                  <h2>Signup Form</h2>
                    <form onSubmit={this.createUser.bind(this)} style={{border: '1px solid #ccc'}}>
                      <div className="container">

                        <label><b>Username</b></label>
                        <input type="text" placeholder="Username" name="username" ref={(username) => this.username = username}/>

                        <label><b>Email</b></label>
                        <input type="text" placeholder="Email" name="email" ref={(email) => this.email = email} />

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Password" name="password" ref={(password) => this.password = password}/>
                       

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