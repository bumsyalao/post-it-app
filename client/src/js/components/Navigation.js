import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Signin from './Signin'
import Signup from './Signup';
import Group from './Group';
import MessageBoard from './MessageBoard';
import DashBoard from "./Dashboard/DashBoard";

import Home from './Home';
import { logout } from '../authentication/authentication'
import { firebaseAuth } from '../firebase/firebase'


// function PrivateRoute ({component: Component, authed, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props} />
//         : <Redirect to={{pathname: '/user/signin', state: {from: props.location}}} />}
//     />
//   )
// }

// function PublicRoute ({component: Component, authed, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => authed === false
//         ? <Component {...props} />
//         : <Redirect to='/messageBoard' />}
//     />
//   )
// }

export default class Navigation extends Component {

    state = {
    authed: false,
    loading: true,
  }
  componentWillMount ()  {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
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
                <li>
                  <Link to='/'>Home</Link>
                </li>
          
                
                <li>
                  {this.state.authed
                    ? <span>
                      <Link to='/messageBoard' >MessageBoard &nbsp;</Link>
                      <Link to='/group' >Group&nbsp;</Link>
                      
                      

                      <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        >Logout</button>
                      
                      </span>
                        
                    : <span>
                        <Link to="/user/signin">SignIn</Link>
                        <Link to="/user/signup">SignUp</Link>     
                        <Link to='/dashboard' >Dashboard</Link>               
                      </span>}
                </li>                
              </ul>
            </nav>
            
          </div>
        </header>
  

      </div>

    )
  }
}