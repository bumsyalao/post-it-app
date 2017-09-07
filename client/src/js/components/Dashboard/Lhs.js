import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
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
      <div>
        <div>
         <h4>Hello, {this.props.user.displayName} </h4> 
        </div>       
  
       <h4>Groups</h4>
                  <ul>
          <li>           
          { 
                 this.props.group.map((KeyName, KeyIndex) => {
                        return(                                        
                    <Groups KeyName={KeyName} key={KeyIndex}/>      
                        ) 
                    }) 
            }
            </li>
        </ul>
        <br/>

        <h4> Users </h4>
        <ul>
          <li> Mark </li>
          <li> John </li>
          <li> Tope </li>
          <li> Asa </li>

          </ul>
         

      </div>
    )
  }


}
 