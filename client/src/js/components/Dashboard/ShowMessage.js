import React, {Component} from 'react'


/**
 * Show all messages of a group
 * 
 * @export
 * @class ShowMessage
 * @extends {Component}
 */
export default class ShowMessage extends Component {
  render() {
    return (
      <div>
        <li>{this.props.message.text}</li>
      </div>

    )
  }
}