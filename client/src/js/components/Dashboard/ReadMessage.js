import React, {Component} from 'react'
import ShowMessage from './ShowMessage'

export default class ReadMessage extends Component {
      state = {
        showMe : false 
      }

  render() {
       if(this.state.showMe) { 
            var message = <li>{this.props.message.text}</li>
            
        } else { 
        
           var message = <li onClick={this.readMessage.bind(this)}> {this.props.message.user} posted in <strong>{this.props.message.group}</strong> group</li>
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