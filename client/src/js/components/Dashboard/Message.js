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
        <li><strong>{this.props.message.user}</strong>   {this.props.message.text}</li>
      </div>

    )
  }
}