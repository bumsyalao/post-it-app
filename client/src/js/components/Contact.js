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
           <td><a href="#" className="btn btn-default" onClick={this.handleEdit}>Edit</a>  <a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, this.props.contact.id)}>Remove</a></td>
       </tr>

    )
  }
  handleRemove(i, j){
    AppActions.removeContact(i);
  }

}
