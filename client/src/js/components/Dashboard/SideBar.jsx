import React, { Component } from 'react';
import { MenuItem, Clearfix } from 'react-bootstrap';
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import Users from './Users';
import Groups from './Groups';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import ModalButton from './ModalButton';


/**
 * @description The Left hand Side of the Dashboard
 * 
 * @class SideBar
 * 
 * @extends {Component}
 */
export default class SideBar extends Component {

  render() { 
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user.replace(" ", "");
    const groups = this.props.group.map((keyName, keyIndex) => <Groups KeyName={keyName} key={keyIndex} userName={this.props.userName}/>)    
    const allUsers = this.props.contact.map((keyName, keyIndex) => <Users KeyName={keyName} key={keyIndex}/>)
    
 
    return (
      <div className="sideBar message-padding">
        <li data-toggle="collapse" data-target="#new" 
          className="collapsed" onClick={() => AppActions.getGroups(userName)}>
          <a href="#"><i className="fa fa-car fa-lg"></i>&nbsp; Group 
          <span className="arrow"></span></a>
        </li>

        <ul className="sub-menu collapse" id="new">
          {groups}
        </ul>
        <br /> 

        <ModalButton menuName={'Users'}/>
          {allUsers}
        <br />
      </div>
    )
  }
}
