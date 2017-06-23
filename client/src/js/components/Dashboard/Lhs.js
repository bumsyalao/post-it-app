import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';





export default class Lhs extends Component {

  state= {
      groupName: '',
      groups: [],
      userName: '',
      users : [],
  }

  setGroupName = (groupName) => {
    this.setState({groupName: groupName.target.value}) 
  }

 

  createGroup = (e) => {
    e.preventDefault()
    var groupID = this.state.groupName

    group(groupID)

    console.log(this.state.groupName)
  }

  render() {

    function onSelectAlert(eventKey) {
      alert(`Alert from menu item.\neventKey: ${eventKey}`);
    }

    return (
      <div>
        <h4>The Group Name</h4>
        <button className="btn btn-primary" onClick={this.showCreateGroup}>create group</button>
        
        <div class="input-group">
          <input type="text" class="form-control" value={this.state.groupName} placeholder="Group Name" onChange={this.setGroupName} />
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button" onClick={this.createGroup}>Submit</button>
          </span>
        </div>
        

        <h4>Groups</h4>

        <ul>
          <li>fACEBOOK</li>
          <li>Google</li>
          <li>Add Room</li>
        </ul><br/><br/>

        <h4>Users</h4>
        
        <ul>
          <li>Ebuka</li>
          <li>Kennedy</li>
          <li>Invite users</li>
        </ul>
      </div>

    )
  }

}
 