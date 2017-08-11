import React, {Component} from 'react'


/**
 * Displays the List of Users in a group
 * @param props 
 * @export
 * @class Users
 * @extends {Component}
 */
export default class Users extends Component {
  render() {
    return (
      <div>
        <li>{this.props.contact.Users}</li>       
      </div>

    )
  }
}