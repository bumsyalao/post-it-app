import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom';

import AppStore from '../stores/AppStore'

import Navigation from './Navigation'
import Signin from './Signin'
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer'
import ContactList from './ContactList' 
import DashBoard from './Dashboard/Dashboard'

export default class Routes extends Component { 
  render() {  
    return (   
          <div>
            <Navigation />
            <Switch>
            <Route path='/' exact component={Home} />
                <Route path='/user/signin' component={Signin} />
                <Route  path='/user/signup' component={Signup} />
                 <Route path='/dashboard' component={DashBoard} />
                 <Route path='/contact' component={ContactList} />
                <Route render={() => <h3>You must be Logged In to see this page</h3>} />
            </Switch>
      </div>
    )
  }
}