import React, {Component} from 'react'
import ShowMessage from './ShowMessage'

export default class ReadMessage extends Component {
  render() {
    return (
      <div>
       <li onClick={this.readMessage.bind(this)}>  <strong>{this.props.message.group}</strong>   {this.props.message.text}</li>

      </div>

    )
  }

  readMessage(e){
    e.preventDefault()

  }
}