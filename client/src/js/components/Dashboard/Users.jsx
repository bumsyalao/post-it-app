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
        <li data-toggle="collapse" className="collapsed">
            <a href="#"><i className="fa fa-globe fa-lg"></i>&nbsp; {this.props.KeyName.userName}</a>
        </li>     

    )
  }
}