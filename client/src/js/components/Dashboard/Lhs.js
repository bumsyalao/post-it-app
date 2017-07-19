import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import Users from './Users'
import Groups from './Groups'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'


// LHS: Left hand side
export default class Lhs extends Component {
  render() {
  return (
      <div>
        <div>
         <h4>Welcome, {this.props.user.displayName}</h4> 
        </div>       
          <div >
                <div onClick={this.handleInbox.bind(this)}><a href="#">Inbox</a></div>
                <div onClick={this.handleArchive.bind(this)}><a href="#">Archive</a></div>
          </div>
   

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
        </ul>
        <br/>
         

      </div>
    )
  }

  handleInbox(e){
  e.preventDefault()
  AppActions.closeArchive()
}

handleArchive(e){
  e.preventDefault()
  AppActions.openArchive()
}

}
 