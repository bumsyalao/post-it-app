import React, {Component} from 'react'
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
    this.onChange= this.onChange.bind(this)
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
      this.setState({showModal: true})
  }

    handleClose(){
    this.setState({ showModal: false });

  }

  componentWillMount ()  {
     AppStore.addChangeListener(this.onChange);
    }
  componentWillUnmount () {
      AppStore.removeChangeListener(this.onChange);
    } 

  

  render() {
    return (
      <div>
      <div className="msg-border">
            <span className="left-side">{this.props.message.user}</span>
            <span className="right-side">Time </span>
             <span onClick={this.handleSeenMessage.bind(this)} >  
              <span className="glyphicon glyphicon-user"></span>
          </span> 
           
      <div className="col-md-12">
      <div className="msg">
        {this.props.message.text}
        </div>
      </div>
      </div>

          <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Users who have Seen Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <ul>
             {
            
                Object.keys(this.state.seenMessage).map(function(keyName, keyIndex) {
             
                return <li key={keyIndex}>{keyName}</li>          
                
                }) 
           
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
    onChange(){
    this.setState({seenMessage: AppStore.getSeenUsers()});
  } 
}
