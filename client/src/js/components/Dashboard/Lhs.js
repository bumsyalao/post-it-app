import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';
import Users from './Users'





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
        
        <div className="input-group">
          <input type="text" className="form-control" value={this.state.groupName} placeholder="Group Name" onChange={this.setGroupName} />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={this.createGroup}>Submit</button>
          </span>
        </div>
        

        <h4>Groups</h4>

        <ul>
          <li>Facebook</li>
          <li>Google</li>
          <li>Andela</li>
          <li>Add Group</li>
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
 