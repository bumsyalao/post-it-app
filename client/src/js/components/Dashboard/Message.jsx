import React, { Component } from 'react'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'
import { Modal } from 'react-bootstrap'

/**
 * This displays the message from the database
 * 
 * @export
 * @class Message
 * @extends {Component}
 */
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seenMessage: AppStore.getSeenUsers(),
      showModal: false,
    };
    this.onChange = this.onChange.bind(this)
    this.handleSeenMessage = this.handleSeenMessage.bind(this);
    this.handleClose = this.handleClose.bind(this)
  }




  handleSeenMessage(event) {
    event.preventDefault();

    const user = {
      groupName: this.props.group,
      messageID: this.props.message.id
    }
    AppActions.seenMessage(user)
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false });

  }

  componentWillMount() {
    AppStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }



  render() {
    return (
      <div>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1"><strong>{this.props.message.user}</strong>&nbsp;&nbsp; 
                <small className="text-muted">{this.props.message.Time}</small>&nbsp;&nbsp;                 
                <span onClick={this.handleSeenMessage.bind(this)} >  
                  <span className="glyphicon glyphicon-user"></span>
                </span>
              </h5>
            </div>
            <p className="mb-1">{this.props.message.text}</p>
          </a>


        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Users who have Read Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className='mylist'>
            
              {this.state.seenMessage ?

                Object.keys(this.state.seenMessage).map(function (keyName, keyIndex) {

                  return <li key={keyIndex}>{keyName}</li>

                }):
                <li className='mylist'>Empty</li>

              }
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <a href="#/dashboard" onClick={this.handleClose.bind(this)}> Close</a>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
  onChange() {
    this.setState({ seenMessage: AppStore.getSeenUsers() });
  }
}
