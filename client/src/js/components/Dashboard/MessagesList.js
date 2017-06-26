import React, {Component} from 'react'
import AppStore from '../../stores/AppStore'
import AppActions from '../../actions/AppActions'
// import Message from './Message'

export default class MessageList extends Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
        // message: '',
       
            user : AppStore.getUser(),
            group : 'Andela',
            // message : 
            contacts: AppStore.getContacts(),
            groups: AppStore.getGroups(),
            messages: AppStore.getMessage()

    }

     this._onChange= this._onChange.bind(this)
    
  }

    componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
  }


  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
  } 


  updateMessage(event){
    this.setState({
      message: event.target.value 
    })
  }

  submitMessage(event){
    const nextMessage = {
      id: this.state.user,
      text: this.state.message
    }

    var list = Object.assign([], this.state.messages)

    // list.push(nextMessage)
    // this.setState({
    //   messages: list
    // })
    console.log(nextMessage)
    // AppActions.saveMessage(nextMessage);
   
  }


 
  render(){
      console.log(this.state.messages)
    return(
      <div>
          <h2><strong>{this.state.group}</strong></h2>

          <ul>
          {
            this.state.messages.map(function(message, index){
              return(
                <Message message={message} key={index} />
                    )
                })
            }
        </ul>
        
        <div id="messages_compose">
        <input onChange={this.updateMessage} type="text" placeholder ="Message" />
        <br />
        <button onClick={this.submitMessage}>Submit Message</button>
        </div>
        
      </div>

      )
  }

  _onChange(){
        this.setState({user: AppStore.getUser()});
        this.setState({group: AppStore.getGroups()});
        this.setState({messages: AppStore.getMessage()});
      
    } 

}



