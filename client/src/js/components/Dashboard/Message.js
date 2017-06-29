import React, {Component} from 'react'

export default class Message extends Component {
  render() {
    return (
      <div>
        <li><strong>{this.props.message.user}</strong>   {this.props.message.text}</li>
      </div>

    )
  }
}