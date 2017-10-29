import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import MessageList from './../presentation/MessageList';
import ModalButton from './../presentation/ModalButton';

/**
 * @description This displays the message from the database
 * 
 * @extends { MessageBoard }
 */
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seenMessage: [],
      showModal: false,
    };
    this.onChange = this.onChange.bind(this)
    this.handleSeenMessage = this.handleSeenMessage.bind(this);
    this.closeModal = this.closeModal.bind(this)
  }


  /**
     * @description Makes an action call to tick users who have seen a message
     * 
     * @param {object} event
     * 
     * @returns {void}
     * 
     * @memberof Messsage
  */
  handleSeenMessage(event) {
    event.preventDefault();

    const user = {
      groupName: this.props.group,
      messageID: this.props.message.id
    }
    AppActions.seenMessage(user)
    this.setState({ showModal: true })
  }

  closeModal() {
    this.setState({ showModal: false });

  }

  /**
   * @method componentWillMount
   * 
   * @description Adds an event Listener to the Store and fires when the component is fully mounted.
   * 
   * @return {void}
   * 
   * @memberof Message
   */
  componentWillMount() {
    AppStore.addChangeListener(this.onChange);
  }

  /**
  * @method componentWillUnmount

  * @description Removes event Listener from the Store

  * @memberof Message
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  /**
   * @method onChange
   * 
   * @description Monitors changes in the components and change the state
   * 
   * @memberof Message
   */
  onChange() {
    this.setState({ seenMessage: AppStore.getSeenUsers() });
  }

  /**
   * @method render
   * 
   * @description Render react component
   * 
   * @memberof Message
   */
  render() {
    return (
      <div>
        <MessageList 
          {...this.props.message}
          action={this.handleSeenMessage}
        />

        <Modal show={this.state.showModal} onHide={this.closeModal}>
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
            <a href="#/dashboard" onClick={this.closeModal}> Close</a>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }

}
