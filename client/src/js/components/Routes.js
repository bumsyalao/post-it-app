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
import Lhs from './Dashboard/Lhs'


/**
 * Create a Route for users who have been authenticated by firebase
 * 
 * @param {any} {component: Component, auth, ...rest} 
 * @returns 
 */
function PrivateRoute ({component: Component, auth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => auth === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}


/**
 * Route for users who aren't authenticated
 * 
 * @param {any} {component: Component, auth, ...rest} 
 * @returns 
 */
function PublicRoute ({component: Component, auth, ...rest}) {
  return ( 
    <Route
      {...rest}
      render={(props) => auth === false
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
                <PublicRoute auth={this.props.auth} path='/login' component={Signin} />
                <PublicRoute auth={this.props.auth} path='/register'  component={Signup} />
                <PrivateRoute auth={this.props.auth} path='/dashboard' component={DashBoard} />
                <Route auth={this.props.auth} path='/reset' component={ResetPassword} />
                <Route auth={this.props.auth} path='/google' component={GoogleWelcome} />
                <PrivateRoute auth={this.props.auth} path='/lhs' component={Lhs} />
                <PrivateRoute auth={this.props.auth} path='/navdash' component={NavDash} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
 
    )
  }
}
