import React, { Component } from 'react';

import {Switch, Route, Redirect, Link} from 'react-router-dom';


import Footer from './Footer'
import Routes from './Routes'

import AppStore from '../stores/AppStore'



function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/user/signin', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

// Create App component
class App extends Component  {
      constructor(props){
        super(props);
        this.state ={
           authed: false,
           loading: true,
           contacts: AppStore.getContacts()
           
        };
         this._onChange= this._onChange.bind(this)
    }

   componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
    console.log("Will Mount")
  }


  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
    console.log("Will UnMount")
  } 


    render() {
          console.log(this.state.contacts)  
      return (
        <div>
        <Routes contacts={this.state.contacts} />      
        <Footer />
        </div>
      )
    }
      _onChange(){
        this.setState({contacts: AppStore.getContacts()});
        console.log(this.state.contacts) 
    }    
}

export default App;