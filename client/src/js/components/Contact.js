import React, {Component} from 'react'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'




export default class ContactList extends Component {
  render() { 
    return (  
       <tr>
           <td>{this.props.contact.username}</td>
           <td>{this.props.contact.email}</td>
           <td>{this.props.contact.password}</td>
           <td><a href="#" className="btn btn-default" onClick={this.handleEdit}>Edit</a></td>
       </tr>

    )
  }


}
