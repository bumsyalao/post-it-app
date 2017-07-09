import React, {Component} from 'react'

export default class Name extends Component {
  render() {
    // AppActions.displayName(this.props.user.displayName)
    return (
      <div>
        <h4>Welcome, {this.props.user.displayName}</h4> 
      </div>

    )
  }
}
