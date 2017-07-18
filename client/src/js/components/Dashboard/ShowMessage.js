import React, {Component} from 'react'

export default class ShowMessage extends Component {
  render() {
    return (
      <div>
        <li>{this.props.message.text}</li>

      </div>

    )
  }
}