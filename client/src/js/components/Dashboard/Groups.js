import React, {Component} from 'react'

export default class Groups extends Component {
  render() {
    return (
      <div>
         <li><a href="#/dashboard" className="btn btn-default" onClick={this.handleEdit}>{this.props.group.id}</a></li>
         
      </div>

    )
  }
}