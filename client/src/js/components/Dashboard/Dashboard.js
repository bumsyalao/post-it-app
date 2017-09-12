import React, {Component} from 'react';
import AppStore from '../../stores/AppStore';
import NavDash from './NavDash';
import LHS from './Lhs';
import MessageBoard from './MessageBoard'
import Welcome from '../Welcome'


import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
 

/**
 * Creates a react Component
 * 
 * @export
 * @class DashBoard
 * @extends {Component}
 */
export default class DashBoard extends Component {
      constructor(props){
        super(props);
        this.state ={
           authed: false,
            user : AppStore.getUser(),      
            contacts: AppStore.getGroupUsers(),
            groups: AppStore.getGroups(),
            currentGroup: AppStore.getCurrentGroup(),
            databaseUsers: AppStore.getdatabaseUsers(),
            notification: AppStore.getNotification(), 
        };
         this.onChange= this.onChange.bind(this)
    }


   /**
    * @method componentWillMount
    * Adds an event Listener to the Store and fires when the component is fully mounted.
    *
    * @return {void}
    * @memberof DashBoard
    */
   componentWillMount ()  {
     AppStore.addChangeListener(this.onChange);
  }


   /**
    * @method componentWillUnmount
    * Removes event Listener from the Store
    *
    * @return {void}
    * @memberof DashBoard
    */
  componentWillUnmount () {
    AppStore.removeChangeListener(this.onChange);
  } 



  /**
   * @method render
   * Render react component
   * 
   * @returns {void}
   * @memberof DashBoard
   */
  render() { 
    return (
      <div id='dash'>
        <NavDash 
          contact={this.state.contacts} 
          group={this.state.groups} 
          user={this.state.user} 
          databaseUsers={this.state.databaseUsers} 
          notification={this.state.notification}
        />     
          
        <div>
          <div className="row">
            <div className="col-md-2 col-sm-12" id='lhs'> <LHS contact={this.state.contacts} group={this.state.groups} user={this.state.user} /></div>


           
            <div className="col-md-10 col-sm-12"> {!this.state.currentGroup ? <Welcome /> : <MessageBoard contact={this.state.contacts} emails={this.state.emails} numbers={this.state.numbers} />} </div>
            
          </div>
        </div>
      </div>

    )
  }


    /**
     * @method setDashboard
     * Monitors changes in the components and change the state
     * 
     * @return {void}
     * @memberof DashBoard
     */
    onChange(){
        this.setState({
          contacts: AppStore.getGroupUsers(), 
          groups: AppStore.getGroups(),
          user: AppStore.getUser(),
          currentGroup: AppStore.getCurrentGroup(),
          databaseUsers: AppStore.getdatabaseUsers(),
          notification: AppStore.getNotification(),
        });
        
    }  
}

 