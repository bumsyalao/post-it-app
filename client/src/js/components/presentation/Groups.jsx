import React, { Component } from 'react'

import AppActions from '../../actions/AppActions'


/**
 * @description Component for displaying list of groups a User belongs to
 * 
 * @class Groups
 * 
 * @extends {Component}
 */
const Groups = (props) => ({
    render() {
        const group = {
            groupName: this.props.KeyName.groupName,
            userName: props.userName
        }
      return (
            <li onClick={() => AppActions.searchUserMessage(group)}>
            <a href="#/dashboard" className="text-decoration">
                {this.props.KeyName.groupName}</a>
        </li>
      );
    }
  });
  
  export default Groups;