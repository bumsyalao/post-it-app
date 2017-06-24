import React, {Component} from 'react'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <li>{this.props.contact.username}</li>
         
      </div>

    )
  }
}