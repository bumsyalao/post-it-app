import React, {Component} from 'react'
import {Link} from 'react-router-dom';

export default class Navigation extends Component {
    state = {
    authed: false,
    loading: true,
  }
  render() {
    return (
      <div>
           <header>
          <div className="container">
            <div id="branding">
              <h1>
                <span className="highlight">PostIt &nbsp;
                </span>Messenger App</h1>
            </div>
            <nav>
              <ul>
                <li> <Link to='/'>Home</Link></li>
                <li><span> <Link to='/dashboard' >Dasboard</Link></span></li>    
             
                 <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}} onClick={this.handleSubmit.bind(this)} className="navbar-brand">Logout</button>
                    : <span>
                      
                      <Link to="/register">SignUp&nbsp;&nbsp;</Link>
                      <Link to="/login">SignIn&nbsp;&nbsp;</Link>    
                      </span>}
                </li>   
                
              </ul>
            </nav>
            
          </div>
        </header>

      </div>

    )
  }

  handleSubmit(){
      console.log("Logout")
  }
}