import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'




export default class NavDash extends Component {

  state = { 
    showModal: false,
    showModal2: false,
    showNotify: false,
    groupName: '',
    userName: '',
    users : []
  };
 
 // Modal for add Users to the Group
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }

  // Modal for creating Group
  closeGroup = () => {
    this.setState({ showModal2: false });
  }
  openGroup = () => {
    this.setState({ showModal2: true });
  }

  // Modal for Notifications
  closeNotify = () => {
    this.setState({ showNotify: false });
  }
  openNotify = () => {
    this.setState({ showNotify: true });
  }


  render() {


    
    return (
      <Navbar inverse collapseOnSelect>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a User to this Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <form onSubmit={this.addUser.bind(this)}>
                  <div className='form-group'>
                      <select className="form-control" ref="type">
                        <option></option>
                        {
                             Object.keys(this.props.group).map(function(keyName, keyIndex) {
                              return <option key={keyIndex} value={keyName}>{keyName}</option>
                                  })  
                        }

                      </select>
                  </div>
                  <div className='form-group'>
                      <input type="text" ref='user' className='form-control' placeholder='Search for a User' required/>
                  </div>
                                
                  <button type='submit' className='btn btn-primary'>Submit</button>
            </form >             
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

         <Modal show={this.state.showModal2} onHide={this.closeGroup}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <form onSubmit={this.createGroup.bind(this)}>
                <div className='form-group'>
                    <input type="text" ref='group' className='form-control' placeholder='GroupName' required/>
                </div>                             
                <button  type='submit' className='btn btn-primary'>Submit</button>
            </form>             
          </Modal.Body>
          <Modal.Footer>
            {/*<Button href="#/dashboard" onClick={this.close2}>Close</Button>*/}
            <a href="#/dashboard" onClick={this.closeGroup}> Close</a>
          </Modal.Footer>
        </Modal>

          
          <Modal show={this.state.showNotify} onHide={this.closeNotify}>
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <ul>
             {
            
                Object.keys(this.props.notification).map(function(keyName, keyIndex) {
             
                return <li key={keyIndex}>{keyName}</li>          
                
                }) 
           
              }
             </ul>           
          </Modal.Body>
          <Modal.Footer>
            <a href="#/dashboard" onClick={this.closeNotify}> Close</a>
          </Modal.Footer>
        </Modal>

        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={2} href="#" onClick = {this.openGroup}>Create Group</NavItem>
            <NavItem eventKey={2} href="#" onClick = {this.open}>Invite a friend</NavItem>

          </Nav>

          <Nav pullRight>
            <NavItem eventKey={1} href="#" onClick = {this.openNotify}>Notification 
                <span className="glyphicon glyphicon-envelope"></span>
        </NavItem>
            <NavItem eventKey={2} href="#" onClick={this.logout.bind(this)}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }


  // Create Group
    createGroup(e){
      e.preventDefault() 
            const group = {
              groupName: this.refs.group.value.trim(),
              userName: this.props.user.displayName
            }    
             AppActions.saveGroup(group);
            this.refs.group.value = '';
          
    }
    

 // Add User to the Group
    addUser(e){
    e.preventDefault(); 

    // Function to convert first letter of each word to capital letter   
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   } 

    // Implements the function
const Uppercase = capitalizeFirstLetter(this.refs.user.value)



      const addUser = {
         groupname: this.refs.type.value.trim(), //group 
         user: Uppercase   //user
      }   

      if(this.refs.type.value === ''){
        alert("Select a group name from the drop down list")
      }
      else if (this.props.databaseUsers.includes(Uppercase)){
        AppActions.saveGroupUser(addUser);
      }else{
        alert("The User dosen't exist")
      }
      this.refs.type.value = ''; 
      this.refs.user.value = '';

}


// Logout User
logout(e){
      e.preventDefault();    
      AppActions.logout();
      
}

}
