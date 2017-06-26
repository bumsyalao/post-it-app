import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'




export default class NavDash extends Component {

  state = { 
    showModal: false,
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
                  <input type="text" ref='id' className='form-control' placeholder='Group Name' required/>
                  </div>
                  <div className='form-group'>
                      <input type="text" ref='users' className='form-control' placeholder='Search for a User' required/>
                  </div>
                                
                  <button type='submit' className='btn btn-primary'>Submit</button>
            </form>

           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">PostIt App</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">New Chat</NavItem>
            <NavItem eventKey={2} href="#" onClick = {this.open}>Invite a friend</NavItem>
            
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>

          <Nav pullRight>
            <NavItem eventKey={1} href="#">Profile</NavItem>
            <NavItem eventKey={2} href="#">Online Status</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

    addUser(e){
    e.preventDefault(); 
      const addUser = {
         id: this.refs.id.value.trim(), //group 
         users: this.refs.users.value.trim()   //user
      }   
      const groupID = addUser.id 
      const allUser = this.props.contact.map((contact, index) =>  contact)
      var result = Object.keys(allUser).map(function(e) {
                return [Number(e), allUser[e]];
  });
      var merged = [].concat.apply([], result);
        var data = []
      merged.forEach(function (user) {
          if (typeof user === 'object') {
              data.push(user);
          }
      });
 
    for (let key in data) {      
        if (data[key].username == addUser.users){
       alert('The User has been added to '+ addUser.id+ " group")
        var uniqueId = data[key].id
        break;      
     }
    }
    if (!uniqueId){
      alert("The user dosen't exist")
    }

    const addUsers = {
   
      groupID: groupID,
      uid: uniqueId
    }
console.log(addUsers)
AppActions.saveGroupUser(addUsers);

}

}
