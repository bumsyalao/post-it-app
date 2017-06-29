import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import Users from './Users'
import Groups from './Groups'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'





export default class Lhs extends Component {

    state= {  
      user : 'Ebuka',
      group : 'Andela',  
  
    }

  render() {
    return (
      <div>
        <div>
            <h4>{this.state.user}</h4>   
        </div>    

       <h4>Groups</h4>
        <ul>
          {
            this.props.group.map(function(group, index){
              return(
                <Groups group={group} key={index} />
                    )
                })
            }
        </ul><br/><br/>
         

       <h4>Users</h4>   
        <ul>
           {
            this.props.contact.map(function(contact, index){
              return(
                <Users contact={contact} key={index} />
                    )
                })
            }
            <li><a href="#" className="btn btn-default" onClick={this.handleEdit}>Invite Users</a></li>
  
        </ul>
     
      
      </div>

    )
  }

}
 