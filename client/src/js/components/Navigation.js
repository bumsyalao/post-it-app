import React, {Component} from 'react'
import {Link} from 'react-router-dom';


/**
 * Navigation Component gives the user access to navigate the app
 * 
 * @export
 * @class Navigation
 * @extends {Component}
 */
export default class Navigation extends Component {
    state = {
    auth: false,
    loading: true,
  }


  /**
   * Makes an action call to to lets users navigate
   * 
   * @returns 
   * @memberof Navigation
   */
  render() {
    return (
      <div>
          <nav className="navbar navbar-inverse fixed-top" style={{ borderRadius: '0px'}}>
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span> 
                </button>
                <span className="navbar-brand low-red" href="#">POST IT</span>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">

                   
                <ul className="nav navbar-nav">
                  <li><Link to='/'>Home</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">

                     {this.state.auth
                    ? <button
                        style={{border: 'none', background: 'transparent'}} onClick={this.handleSubmit.bind(this)} className="navbar-brand">Logout</button>
                    : 
                  <li>
                    <span className="sign-up"> <Link to="/register">Sign Up</Link></span>
                   
                  </li>
                                                                
                      }
          
                </ul>
              </div>
            </div>
          </nav>

      </div>

    )
  }
}