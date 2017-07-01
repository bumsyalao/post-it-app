import React, {Component} from 'react'

export default class Name extends Component {
  render() {
    return (
      <div>
        <h4>Welcome, {this.props.user.displayName}</h4> 
      </div>

    )
  }
}
