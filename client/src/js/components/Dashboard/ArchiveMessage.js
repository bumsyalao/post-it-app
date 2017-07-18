import React, {Component} from 'react'

export default class ArchiveMessage extends Component {
  render() {
    return (
      <div>
       <li>{this.props.message.text}</li>

      </div>

    )
  }
}