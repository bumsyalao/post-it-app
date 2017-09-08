import React, {Component} from 'react'

/**
 * This displays the message from the database
 * 
 * @export
 * @class Message
 * @extends {Component}
 */
export default class Message extends Component {
  render() {
    return (
      <div>
      <div className="msg-border">
            <span className="left-side">{this.props.message.user}</span>
            <span className="right-side">Time </span>
            <span className="glyphicon glyphicon-user"></span>
      <div className="col-md-12">
      <div className="msg">
        {this.props.message.text}
        </div>
      </div>
      </div>
      </div>


    )
  }
}