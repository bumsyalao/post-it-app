import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import Users from './Users'
import Groups from './Groups'


import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'





export default class Lhs extends Component {
  render() {
  return (
      <div>
        <div>
         <h4>Welcome, {this.props.user.displayName}</h4> 
        </div> <br/>  

       <h4>Groups</h4>
        <ul>
          <li>           
          { 
              Object.keys(this.props.group).map(function(keyName, keyIndex) {
                return(
                    <div key={keyIndex} onClick={() => AppActions.searchUserMessage(keyName)}>  
                      <a href="#/dashboard" className="btn btn-default">  {keyName}</a>
                    </div>             
                )
                })
            }
            </li>
        </ul><br/>
         

       <h4>Users</h4>   
        <ul>
          <li>
           {
          Object.keys(this.props.contact).map(function(keyName, keyIndex) {
                var post = keyName
                return(
                    <div key={keyIndex} onClick={() => console.log(keyName)}>  
                      <a href="#/dashboard" className="btn btn-default">  {keyName}</a>
                    </div>             
                )
                })       
            }
            </li>
            <br/>
            <li><a href="#" className="btn btn-default" onClick={this.handleEdit}>Invite Users</a></li>
  
        </ul>  
      </div>
    )
  }
}
 