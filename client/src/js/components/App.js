import React, { Component } from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Footer from './Footer'
import Routes from './Routes'
import AppStore from '../stores/AppStore'
import {firebaseAuth, firebase}from '../../../../server/config'

import Signin from './Signin'
import Signup from './Signup';
import Home from './Home';
import Navigation from './Navigation'


import Dashboard from './Dashboard/Dashboard'
import {BrowserRouter} from 'react-router-dom';



// Create App component
class App extends Component  {
  constructor(props){
        super(props);
        this.state ={
           authed: AppStore.getAuthed(),
           user: AppStore.getUser(),         
        };
         this._onChange= this._onChange.bind(this)
    }


   componentDidMount(){
        AppStore.addChangeListener(this._onChange);
    }

    componentUnmount(){
        AppStore.removeChangeListener(this._onChange);
    }
 
    render() {    
      return(
        <div>
          {!this.state.authed ? <Navigation /> : ''}
         <Routes authed={this.state.authed} />
         <Footer />
        </div>
    );
  }  
    
    _onChange(){
        this.setState({user: AppStore.getUser()});
        this.setState({authed: AppStore.getAuthed()});      
    }      
}

export default App;