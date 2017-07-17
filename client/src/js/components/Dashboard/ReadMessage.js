import React, {Component} from 'react'

export default class ReadMessage extends Component {
  render() {
    return (
      <div>
       <li><strong>{this.props.message.group}</strong>   {this.props.message.text}</li>

      </div>

    )
  }
}