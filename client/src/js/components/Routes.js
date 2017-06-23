import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom';

import AppStore from '../stores/AppStore'

import Signin from './Signin'
import Signup from './Signup';
import Group from './Group';
import MessageBoard from './MessageBoard';
import Home from './Home';
import Footer from './Footer'
import ContactList from './ContactList' 

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
                      <Link to='/group' >Group&nbsp;</Link>
                      

                      <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        >Logout</button>
                      
                      </span>
                        
                    <span>
                        <Link to="/user/signin">SignIn&nbsp;</Link>
                        <Link to="/user/signup">SignUp</Link>                    
                      </span>
                </li>                
              </ul>
            </nav>
            
          </div>
        </header>

        <Switch>
            <Route path='/' exact component={Home} />
                <Route path='/user/signin' component={Signin} />
                <Route  path='/user/signup' component={Signup} />
                <Route path='/messageBoard' component={ContactList} />
                <Route path='/messageBoard' component={() => (<ContactList mycontact={this.state.mycontact} />)}/>
                 <Route path='/group' component={Group} />
                <Route render={() => <h3>You must be Logged In to see this page</h3>} />
          
        </Switch>
      </div>
    )
  }
}