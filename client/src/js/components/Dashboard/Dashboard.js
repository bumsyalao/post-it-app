import React, { Component } from 'react';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions'
import NavDash from './NavDash';
import DashboardNavigation from './DashboardNavigation'
import SideBar from './SideBar';
import Board from './Board'
import Welcome from '../Welcome'
import WelcomeBoard from './WelcomeBoard'


import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


/**
 * Creates a react Component
 * 
 * @export
 * @class DashBoard
 * @extends {Component}
 */
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      user: AppStore.getUser(),
      contacts: AppStore.getGroupUsers(),
      groups: AppStore.getGroups(),
      currentGroup: AppStore.getCurrentGroup(),
      databaseUsers: AppStore.getdatabaseUsers(),
      notification: AppStore.getNotification()
    };
    this.onChange = this.onChange.bind(this)
  }


  /**
   * @method componentWillMount
   * Adds an event Listener to the Store and fires when the component is fully mounted.
   *
   * @return {void}
   * @memberof DashBoard
   */
  componentWillMount() {

    AppStore.addChangeListener(this.onChange);
  }


  /**
   * @method componentWillUnmount
   * Removes event Listener from the Store
   *
   * @return {void}
   * @memberof DashBoard
   */
  componentWillUnmount() {
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
    let userName = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <div className="nav-side-menu">
          <div className="brand">PostIt</div>
          <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
          <div className="menu-list">

            <ul id="menu-content" className="menu-content collapse out">

              <li>
                <a href="#">
                  <i className="fa fa-dashboard fa-lg"></i>&nbsp; {userName} 
                     </a>
              </li>
              <br/>

              <DashboardNavigation
                contact={this.state.contacts}
                group={this.state.groups}
                user={this.state.user}
                databaseUsers={this.state.databaseUsers}
                notification={this.state.notification}
              />              
              <br/>
                <SideBar contact={this.state.contacts} group={this.state.groups} user={this.state.user} currentGroup={this.state.currentGroup}/>
            </ul>

          </div>
        </div>
         {!this.state.currentGroup ? <WelcomeBoard /> : <Board contact={this.state.contacts} emails={this.state.emails} numbers={this.state.numbers} />}
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
  onChange() {
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

