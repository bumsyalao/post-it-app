import React, {Component} from 'react'

export default class UserAdd extends Component {

  handlesubmit = (e) => {
    e.preventDefault()

  }


  render() {
    return (
      <div>
        <h1>Invite some teammates</h1>
        <h3>You can try HipChat by yourself, but it works much better with people you know. Send an invite to three people you work with to give it a spin.</h3>

        <form onSubmit={this.handlesubmit}>
          <input type="text"  name="groupname" ref="group"/>
          <input type="text"  name="groupname" ref="group"/>
          <input type="text"  name="groupname" ref="group"/>
          <input type="submit"  name="groupname" ref="group"/>
         
          
        </form> 

      </div>

    )
  }
}