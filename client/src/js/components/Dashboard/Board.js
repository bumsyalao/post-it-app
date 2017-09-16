import React, { Component } from 'react';
import Message from './Message';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import toastr from 'toastr';
import moment from 'moment';

/**
 * The Presentation component that servers all message activities
 * 
 * @export
 * @class MessageBoard
 * @extends {Component}
 */
export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: AppStore.getUser(),
            currentGroup: AppStore.getCurrentGroup(),
            messages: AppStore.getMessages()
        };
        this.onChange = this.onChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentWillMount() {
        AppStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }




    render() {
        return (
            <div className="container" id="main">
                <div className="row">
                    <div className="col-md-12">
                        <div className="viewMessageBoard">
                            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">John Cena <small className="text-muted">3 days ago</small></h5>
                                </div>
                                <p className="mb-1">Donec id elit non mi porta gravida at eget metus.
                                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                                Maecenas sed diam eget risus varius blandit.</p>
                            </a>
                            {
                                this.state.messages.map((message, index) => {
                                    return (
                                        <Message message={message} key={index} group={this.state.currentGroup} />
                                    )
                                })
                            }

                        </div>

                        <div className="sendMessageDiv">
                            <form onSubmit={this.sendMessage}>
                                <div className="form-group col-sm-2">
                                    <select ref="type" className="form-control" id="exampleFormControlSelect1">
                                        <option>Normal</option>
                                        <option>Urgent</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                                <input ref='message' className="col-sm-10 sendMessageInput" placeholder='Enter a message' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    sendMessage(e){
        e.preventDefault();  
        console.log(this.state.currentGroup)
        const userName = JSON.parse(localStorage.getItem('user')); 
        const message = {
          user: userName,
          group: this.state.currentGroup,     
          text: this.refs.message.value.trim(),
          Time: moment().format('h:mm a, MMM Do'),
          notification: userName+' posted in '+ this.state.currentGroup +' group',
          priority: this.refs.type.value  
        }       
       
       if(typeof message.text === 'string' && message.text.length > 0){                    
           AppActions.saveMessage(message)  
           console.log(message)
          this.refs.message.value = '';
       }             
    }
    onChange() {
        this.setState({ currentGroup: AppStore.getCurrentGroup() });
        this.setState({ messages: AppStore.getMessages() });
        this.setState({ user: AppStore.getUser() });
    }

}
