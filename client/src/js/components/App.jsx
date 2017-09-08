import React, { Component } from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Footer from './Footer'
import Routes from './Routes'
import AppStore from '../stores/AppStore'
import { firebaseAuth, firebase }from '../../../../server/config'
import Signin from './Signin'
import Signup from './Signup';
import Home from './Home';
import Navigation from './Navigation'
import Dashboard from './Dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom';




/**
 * Main App
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component  {
  constructor(props){
        super(props);
        this.state = {
           auth: AppStore.getAuth(),
           user: AppStore.getUser(),         
        }; 
         this.onChange= this.onChange.bind(this) 
    }

   /**
    * @method componentDidMount
    * Adds an event Listener to the Store and fires when the component is fully mounted.
    *
    * @return {void}
    * @memberof App
    */
   componentDidMount(){
        AppStore.addChangeListener(this.onChange);
    }

    /**
    * @method componentUnmount
    * Removes event Listener from the Store
    * 
    * @memberof App
    */
    componentUnmount(){
        AppStore.removeChangeListener(this.onChange);
    }
 
/**
   * @method render
   * Render react component
   * 
   * @memberof App
   */
    render() {
      return(
        <div>
          {!this.state.auth ? <Navigation /> : ''}
         <Routes auth={this.state.auth} />
         <Footer />
        </div>
    );
  }  
    
 /**
     * @method setApp
     * Monitors changes in the components and change the state
     * 
     * @memberof App
     */
    onChange(){
        this.setState({user: AppStore.getUser()});
        this.setState({auth: AppStore.getAuth()});      
    }      
}

export default App;