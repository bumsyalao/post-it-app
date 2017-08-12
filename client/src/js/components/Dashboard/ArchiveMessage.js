import React, {Component} from 'react'
import AppActions from '../../actions/AppActions'

export default class ArchiveMessage extends Component {
      state = {
        showMe : false 
      }

  render() {
         if(this.state.showMe) { 
               var message = <li>   <div onClick={() => AppActions.inboxMessage(this.props.message.id)} > <div><input type="checkbox" name="messa" defaultChecked /> {this.props.message.text} <br/> posted by  {this.props.message.user} in <strong>{this.props.message.group}</strong> group  <a href="#/dashboard">Send message to Inbox</a></div><br/> </div></li>         
         } else {      
           var message = <div> <li onClick={this.readMessage.bind(this)}> <a href="#" className="btn btn-default"> {this.props.message.text} </a> </li></div> 
         } 
    return (
      <div>
       {message}
      </div>
    )
  }

    readMessage(e){
    e.preventDefault()
    this.setState({ showMe : true} );
  }

}