import React, {Component} from 'react';

import { MenuItem, Clearfix } from 'react-bootstrap';

import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import Users from './Users'
import Groups from './Groups'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'





export default class Lhs extends Component {

  state= {     
 
  }

    close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  setGroupName = (groupName) => {
    this.setState({groupName: groupName.target.value}) 
  }

 


  render() {
    
    return (
      <div>
         <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
  
               <form onSubmit={this.createGroup.bind(this)}>
                <div className='form-group'>
                    <input type="text" ref='group' className='form-control' placeholder='GroupName' required/>
                </div>
                               
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>

           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div>
            <h4>The Group Name</h4>
        <a href="#" className="btn btn-default" onClick = {this.open}>Create Group</a>
     
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
    createGroup(e){
      e.preventDefault();    
        const group = this.refs.group.value.trim()        
        AppActions.saveGroup(group);
        console.log(group)
}
}
 