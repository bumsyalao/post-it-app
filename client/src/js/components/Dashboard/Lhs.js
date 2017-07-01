import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import Users from './Users'
import Groups from './Groups'
import Name from './Name'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'





export default class Lhs extends Component {

  render() {   
    return (
      <div>
        <div>
            {  
            this.props.user.map((user, index) =>{
              return(              
                <Name user={user} key={index} />
                   )
             })
          }  
        </div>    

       <h5>Groups</h5>
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
 