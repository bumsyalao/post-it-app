import React, { Component } from 'react';
import toastr from 'toastr';
import moment from 'moment';

import Message from './Message';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';

/**
 * @description The Presentation component that servers all message activities
 * 
 * @class MessageBoard
 * 
 * @extends {Component}
 */
const WelcomeBoard = (props) => ({
    render() {
        return (
            <div className="container" id="main">
                <div className="row">
                    <div className="col-md-12" >
                        <div className="viewMessageBoard">
                            <div className="container" >
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <center>
                                            <h3>Welcome {this.props.userName}</h3>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default WelcomeBoard;