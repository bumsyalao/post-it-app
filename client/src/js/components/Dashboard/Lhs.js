import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';


export default class Lhs extends Component {

  render() {

    function onSelectAlert(eventKey) {
      alert(`Alert from menu item.\neventKey: ${eventKey}`);
    }

    return (
        <div>
        <ul>
          <li>Group Name</li>
        </ul>
        </div>

    )
  }

}
 