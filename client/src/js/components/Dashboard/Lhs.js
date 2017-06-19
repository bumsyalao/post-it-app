import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';


export default class Lhs extends Component {

  render() {

    function onSelectAlert(eventKey) {
      alert(`Alert from menu item.\neventKey: ${eventKey}`);
    }

    return (
        <div>
        <h4>Group Name</h4><br/>
        <h4>ROOMS</h4>
        <ul>
          <li>fACEBOOK</li>
          <li>Google</li>
          <li>Add Room</li>
        </ul><br/>
        <h4>People</h4>
        <ul>
          <li>Ebuka</li>
          <li>Kennedy</li>
          <li>Invite users</li>
        </ul>
        </div>

    )
  }

}
 