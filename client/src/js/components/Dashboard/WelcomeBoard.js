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
export default class WelcomeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onChange = this.onChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount() {
        AppStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }

    sendMessage(e){
        e.preventDefault();
        console.log(this.refs.type.value)
        console.log(this.refs.message.value.trim()
    )
    }


    render() {
        let userName = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="container" id="main">
                <div className="row">
                    <div className="col-md-12">
                        <div className="viewMessageBoard">
                        <h1>Welcome {userName}</h1>
                        <p>You have 9 unread Message</p>

 
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    onChange() {

    }

}
