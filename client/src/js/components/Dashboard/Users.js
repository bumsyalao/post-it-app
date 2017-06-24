import React, {Component} from 'react'

export default class Users extends Component {
  render() {
    return (
      <div>
        <li>{this.props.contact.username}</li>
         
      </div>

    )
  }
}