import React, {Component} from 'react'


/**
 * Display List of Users who have seen a message
 * 
 * @export
 * @class SeenUsers
 * @extends {Component}
 */
export default class SeenUsers extends Component {
  render() {
    return (
      <option>  
      {this.props.users.Seen}
      </option>  

    )
  }
}