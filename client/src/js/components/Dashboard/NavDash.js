import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Modal, Button, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'



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


  setGroupName = (groupName) => {
    this.setState({groupName: groupName.target.value}) 
  }

   setUserName = (userName) => {
    this.setState({userName: userName.target.value}) 
  }

   createGroup = (e) => {
    e.preventDefault()
    var groupID = this.state.groupName

    group(groupID)

    console.log(groupID)
  }


  createUser = (e) => {
    e.preventDefault()
    var uid = this.state.userName

    group(uid)

    console.log(uid)
  }



  render() {

    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip> 
    );

    return (
      <Navbar inverse collapseOnSelect>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
          <div className="input-group">
            <input type="text" className="form-control" value={this.state.groupName} placeholder="Group Name" onChange={this.setGroupName} />
            <input type="text" className="form-control" value={this.state.userName} placeholder="User Name" onChange={this.setUserName} />
           
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.createUser}>Submit</button>
              </span>
          </div>

           
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
            <NavItem eventKey={2} href="#" onClick = {this.open}>Invite your team</NavItem>
            
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

}
