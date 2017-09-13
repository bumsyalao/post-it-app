import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'
import GroupOptions from './GroupOptions'
import toastr from 'toastr'

/**
 * Displays the navigation of the dashboard
 * 
 * @export
 * @class NavDash
 * @extends {Component}
 */
export default class DashboardNavigation extends Component {
    state = {
        showModal: false,
        showModal2: false,
        showNotify: false,
        groupName: '',
        userName: '',
        users: []
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
        console.log(this.props.contact)
        return (
            <div>

                <li data-toggle="collapse" className="collapsed">
                    <a href="#" onClick={this.openGroup}><i className="fa fa-globe fa-lg"></i>&nbsp; Create Group</a>
                </li>

                <Modal show={this.state.showModal2} onHide={this.closeGroup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.createGroup.bind(this)}>
                            <div className='form-group'>
                                <input type="text" ref='group' className='form-control' placeholder='GroupName' required />
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="#/dashboard" onClick={this.closeGroup}> Close</a>
                    </Modal.Footer>
                </Modal>



                <li data-toggle="collapse" className="collapsed">
                    <a href="#"><i className="fa fa-globe fa-lg"></i>&nbsp; Find a User</a>
                </li>

                <li data-toggle="collapse" className="collapsed">
                    <a href="#" onClick={this.open}><i className="fa fa-globe fa-lg"></i>&nbsp; Invite a Friend</a>
                </li>

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
                                        this.props.group.map(function (keyName, keyIndex) {
                                            return (
                                                <GroupOptions keyName={keyName} key={keyIndex} />
                                            )

                                        })
                                    }

                                </select>
                            </div>
                            <div className='form-group'>
                                <input type="text" ref='user' className='form-control' placeholder='Search for a User' required />
                            </div>

                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form >
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>



                <li data-toggle="collapse" className="collapsed">
                    <a href="#" onClick = {this.openNotify}><i className="fa fa-globe fa-lg"></i>&nbsp; Notification</a>
                </li>
                <Modal show={this.state.showNotify} onHide={this.closeNotify}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {

                                Object.keys(this.props.notification).map(function (keyName, keyIndex) {

                                    return <li key={keyIndex}>{keyName}</li>

                                })

                            }
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="#/dashboard" onClick={this.closeNotify}> Close</a>
                    </Modal.Footer>
                </Modal>



                <li data-toggle="collapse" className="collapsed">
                    <a href="#" onClick={this.logout.bind(this)}><i className="fa fa-globe fa-lg"></i>&nbsp; Logout</a>
                </li>

            </div>

        )
    }

    createGroup(e) {
        e.preventDefault()
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const groupName = capitalizeFirstLetter(this.refs.group.value.trim())
        const group = {
            groupName,
            userName: this.props.user.displayName
        }
        console.log(group);
        this.refs.group.value = '';

    }

    addUser(e) {
        e.preventDefault();

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const userName = capitalizeFirstLetter(this.refs.user.value)
        const addUser = {
            groupname: this.refs.type.value.trim(),
            userName
        }
        if (this.refs.type.value === '') {
            toastr.error("Select a group name from the drop down list")
        }
        else if (this.props.databaseUsers.includes(userName)) {
            AppActions.saveGroupUser(addUser);
        } else {
            toastr.error("The User dosen't exist")
        }
        this.refs.type.value = '';
        this.refs.user.value = '';

    }


    // Logout User
    logout(e) {
        e.preventDefault();
        AppActions.logout();

    }
}
