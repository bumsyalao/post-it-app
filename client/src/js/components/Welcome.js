import React, {Component} from 'react'

export default class Welcome extends Component {

  handlegroup = (e) => {
    e.preventDefault()

  }

    handlejoin = (e) => {
    e.preventDefault()

  }

  render() {
    return (
      <div>
        <h1>What would you like to do</h1>
        <h3>You can create a brand new HipChat team or join an existing team at your
          company.</h3>
        <form>
          <input type="button" onclick={this.handlegroup} name="groupname" ref="group"/>
          
        </form> 

      </div>

    )
  }
}