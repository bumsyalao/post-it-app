import React, { Component } from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import Users from './Users'
import Groups from './Groups'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'




/**
 * The Left hand Side of the 
 * 
 * @export
 * @class Lhs
 * @extends {Component}
 */
export default class Lhs extends Component {
  
  render() {
    return (
      <div className="sideBar message-padding">
        <div>
          <h4>{this.props.user.displayName}</h4>
        </div>

        <h4>Groups</h4>
        <ul className="list-styles">
            {
              this.props.group.map((KeyName, KeyIndex) => {
                return (
                  <Groups KeyName={KeyName} key={KeyIndex} />
                )
              })
            }
        </ul>
        <br />

        <h4> Users </h4>
        <ul className="list-styles">
        {
              this.props.contact.map((KeyName, KeyIndex) => {
                return (
                  <Users KeyName={KeyName} key={KeyIndex} />
                )
              })
            }

        </ul>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>
            <li>User</li>

      </div>
    )
  }


}
