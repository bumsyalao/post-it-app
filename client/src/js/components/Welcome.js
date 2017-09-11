import React, {Component} from 'react'

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <div className="message-padding">
        <h3>Welcome </h3>
        <h3>You have 18 Unread Message</h3>
        <form>
          {/* <input type="button" onclick={this.handlegroup} name="groupname" ref="group"/> */}
          
        </form> 
      </div>
      </div>

    )
  }
}