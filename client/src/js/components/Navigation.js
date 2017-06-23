import React, {Component} from 'react'
import {Link} from 'react-router-dom';

export default class Navigation extends Component {
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
                <li> <span>
                      <Link to="/user/signup">SignUp&nbsp;&nbsp;</Link>
                      <Link to="/user/signin">SignIn&nbsp;&nbsp;</Link>                 
                      <Link to="/logout">LogOut&nbsp;&nbsp;&nbsp;&nbsp;</Link>                   
                      </span>
                      <span> <Link to='/dashboard' >Dashboard</Link></span>
                </li>                
              </ul>
            </nav>
            
          </div>
        </header>

      </div>

    )
  }
}