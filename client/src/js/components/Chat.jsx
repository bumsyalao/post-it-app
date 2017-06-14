import React, {Component} from 'react';

// import { group } from '../authentication/authentication'
// import { groupRef } from '../firebase/firebase';

// Without Firebase
class Group extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
        message: '',
        messages: [
            {id:0, text: 'first message'},
            {id:1, text: 'first message'},
            {id:2, text: 'first message'}

        ]
    }
    
  }

  updateMessage(event){
    console.log('updateMessage:'+ event.target.value)
    this.setState({
      message: event.target.value 
    })
  }

  submitMessage(event){
    console.log('submitMessage: '+ this.state.message)
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }

    var list = Object.assign([], this.state.messages)
    list.push(nextMessage)
    this.setState({
      messages: list
    })
  }


  render(){
    const currentMessage = this.state.messages.map((message, i) => {
      return (
          <li key={message.id}>{message.text}</li>

        )
    })
    return(
      <div>
        <ul>
          {currentMessage}
        </ul>
        
        <input onChange={this.updateMessage} type="text" placeholder ="Message" />
        <br />
        <button onClick={this.submitMessage}>Submit Message</button>
      </div>

      )
  }



}



export default Group;


// With Firebase
import React, {Component} from 'react';

// import { group } from '../authentication/authentication'
// import { groupRef, firebase } from '../firebase/firebase';

class Group extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
        message: '',
        messages: [
           
        ]
    }
    
  }

  componentDidMount() {
    console.log('componentdid')
    firebase.database().ref('message/').on('value', (snapshot) => {

      const currentMessages = snapshot.val()

      if (currentMessages != null){
        this.setState({
          messages: currentMessages
        })
      }
    })
  }
  updateMessage(event){
    console.log('updateMessage:'+ event.target.value)
    this.setState({
      message: event.target.value 
    })
  }

  submitMessage(event){
    console.log('submitMessage: '+ this.state.message)
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }

    firebase.database().ref('message/' +nextMessage.id).set(nextMessage)

  }


  render(){
    const currentMessage = this.state.messages.map((message, i) => {
      return (
          <li key={message.id}>{message.text}</li>

        )
    })
    return(
      <div>
        <ul>
          {currentMessage}
        </ul>
        
        <input onChange={this.updateMessage} type="text" placeholder ="Message" />
        <br />
        <button onClick={this.submitMessage}>Submit Message</button>
      </div>

      )
  }



}



export default Group;