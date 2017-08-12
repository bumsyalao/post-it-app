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
           {/* <header>
            <div className="container">
            <div id="branding">
              <h1>
                <span className="highlight">PostIt &nbsp;
                </span> </h1>
            </div>
            <nav>
              <ul>           
                 <li>
                  <Link to='/'>Home&nbsp;&nbsp;</Link>
                  {this.state.auth
                    ? <button
                        style={{border: 'none', background: 'transparent'}} onClick={this.handleSubmit.bind(this)} className="navbar-brand">Logout</button>
                    : <span>
                      
                      <Link to="/register">Register&nbsp;&nbsp;</Link>
                      <Link to="/login">Login&nbsp;&nbsp;</Link>    
                      </span>}
                </li>   
                
              </ul>
            </nav>           
            </div>
          </header> */}
          <nav className="navbar navbar-inverse" style={{ borderRadius: '0px'}}>
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span> 
                </button>
                <a className="navbar-brand low-red" href="#">POSTIT</a>
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
                  <div>
                    <span><a href="#"><span className="glyphicon glyphicon-user"></span></a> <Link to="/register">Sign Up&nbsp;&nbsp;</Link></span>
                   <span><a href="#"><span className="glyphicon glyphicon-log-in"></span></a> <Link to="/login">Login </Link> </span>

                  </div>
                  
                      
                         
                      }
          
                </ul>
              </div>
            </div>
          </nav>

      </div>

    )
  }

  handleSubmit(){
      console.log("Logout")
  }
}