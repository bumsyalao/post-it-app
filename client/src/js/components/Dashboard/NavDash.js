import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'




export default class NavDash extends Component {

  state = { 
    showModal: false,
    showModal2: false,
    groupName: '',
    userName: '',
    users : []
  };
 
  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }
  close2 = () => {
    this.setState({ showModal2: false });
  }

  open2 = () => {
    this.setState({ showModal2: true });
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
                  <input type="text" ref='groupname' className='form-control' placeholder='Group Name' required/>
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

         <Modal show={this.state.showModal2} onHide={this.close2}>
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
            <Button onClick={this.close2}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/dashboard">PostIt App</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={2} href="#" onClick = {this.open2}>Create Group</NavItem>
            <NavItem eventKey={2} href="#" onClick = {this.open}>Invite a friend</NavItem>

          </Nav>

          <Nav pullRight>
            <NavItem eventKey={1} href="#">Profile</NavItem>
            <NavItem eventKey={2} href="#" onClick={this.logout.bind(this)}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

    addUser(e){
    e.preventDefault(); 
      const addUser = {
         groupname: this.refs.groupname.value.trim(), //group 
         user: this.refs.user.value.trim()   //user
      }   

    if (this.props.databaseUsers.includes(this.refs.user.value)){
      AppActions.saveGroupUser(addUser);
    }else{
      alert("The User dosen't exist")
    }
      this.refs.groupname.value = ''; 
      this.refs.user.value = '';

}

createGroup(e){ 
  e.preventDefault()

        const group = this.refs.group.value.trim()        
        AppActions.saveGroup(group);
        this.refs.group.value = '';
      
}

logout(e){
      e.preventDefault();    
      AppActions.logout();
      
}

}
