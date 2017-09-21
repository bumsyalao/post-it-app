import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import AppStore from '../stores/AppStore'
import Navigation from './Navigation'
import Signin from './Signin'
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer'
import ResetPassword from './ResetPassword'
import GoogleWelcome from './GoogleWelcome'
import DashBoard from './Dashboard/Dashboard'
import NavDash from './Dashboard/NavDash'
import SideBar from './Dashboard/SideBar'
import { firebase } from '../../../../server/config';


/**
 * Create a Route for users who have been authedenticated by firebase
 * 
 * @param {any} {component: Component, authed, ...rest} 
 * @returns 
 */
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}


/**
 * Route for users who aren't authedenticated
 * 
 * @param {any} {component: Component, authed, ...rest} 
 * @returns 
 */
function PublicRoute ({component: Component, authed, ...rest}) {
  return ( 
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}


/**
 * Route for rendering componets in the main App
 * 
 * @export
 * @class Routes
 * @extends {Component}
 */
export default class Routes extends Component { 

  render() {  
    return (         
           <div>
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <Route authed={this.props.authed} path='/login' component={Signin} />
                <PublicRoute authed={this.props.authed} path='/register'  component={Signup} />
                <PrivateRoute authed={this.props.authed} path='/dashboard' component={DashBoard} />
                <Route authed={this.props.authed} path='/reset' component={ResetPassword} />
                <Route authed={this.props.authed} path='/google' component={GoogleWelcome} />
                <PrivateRoute authed={this.props.authed} path='/sidebar' component={SideBar} />
                <PrivateRoute authed={this.props.authed} path='/navdash' component={NavDash} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
 
    )
  }
}
