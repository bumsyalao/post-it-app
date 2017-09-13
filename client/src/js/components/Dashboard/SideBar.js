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
 * @class SideBar
 * @extends {Component}
 */
export default class SideBar extends Component {
  
  render() {

    let userName = JSON.parse(localStorage.getItem('user'));
    // const groupName = JSON.parse(localStorage.getItem('groupName'))
    // console.log(this.props.group)
    // console.log(this.props.group === groupName)
    // console.log(groupName)

  let groupObject = this.props.group

    return (
      <div className="sideBar message-padding">
        <div>
          <h4>{userName}</h4>
        </div>

        <h4>Groups</h4>
        <ul className="list-styles">
            {
              groupObject.map((KeyName, KeyIndex) => {
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
      </div>
    )
  }


}
