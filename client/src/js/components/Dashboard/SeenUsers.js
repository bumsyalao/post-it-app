import React, {Component} from 'react'

export default class SeenUsers extends Component {
  render() {
    return (
      <option>  
      {this.props.users.Seen}

      </option>  

    )
  }
}