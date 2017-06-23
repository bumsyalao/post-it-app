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
                <li>
                  <Link to='/'>Home</Link>
                </li>
          
                
                <li>
               
                    <span>
                      <Link to='/messageBoard' >MessageBoard &nbsp;</Link>
                      <Link to='/dashboard' >Dashboard&nbsp;</Link>
                      
                      </span>
                        
                    <span>
                        <Link to="/user/signin">SignIn&nbsp;</Link>
                        <Link to="/user/signup">SignUp&nbsp;</Link>  
                         <Link to="/logout">LogOut</Link>                   
                      </span>
                </li>                
              </ul>
            </nav>
            
          </div>
        </header>

      </div>

    )
  }
}