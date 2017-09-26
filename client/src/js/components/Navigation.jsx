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
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      loading: true,
    };
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
              <div className="navbar-header" id="navbar-header">
                <span style={{ marginRight: '30px' }} className="navbar-brand low-red" href="#"> &nbsp;&nbsp;POST IT</span>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                  <li><Link to='/'>Home </Link></li>
                </ul>
             </div>
            </div> 
          </nav>
      </div>

    )
  }
}