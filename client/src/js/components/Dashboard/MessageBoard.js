import React, {Component} from 'react'
import Message from './Message'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'


export default class MessageBoard extends Component {
     constructor(props){
        super(props);
        this.state ={
            user : AppStore.getUser(),
            currentGroup : AppStore.getCurrentGroup(),     
            messages : AppStore.getMessages()
            // contacts: AppStore.getContacts(),
            // groups: AppStore.getGroups()       
        };
         this._onChange= this._onChange.bind(this)
    }

    componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount () {
      AppStore.removeChangeListener(this._onChange);
    } 

  
  render() {



    return (
       <div>
       <section id="showcase">
        <div id="messageArea" className="row">
             <div className="jumbotron">
              <ul style={{color: 'black', textAlign: 'left'}}>
                <ul>
                {
                  this.state.messages.map((message, index) => {
                     return(
                       <Message message={message} key={index}/>
                     ) 
                  })
                }                            
              </ul>
              </ul>
            </div>
       
          <div className="col-md-12">
            <div className="chat" id="chat" />

            <form id="messageForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label>Enter Message</label>
                <textarea className="form-control" id="message" ref='message' placeholder="Enter Message"/>
                <br />
                <input type="submit" className="btn btn-primary" defaultValue="Send Message" />
              </div>
            </form>
         </div>
        </div>
      </section>
      </div>
    )
  }

      handleSubmit(e){
          e.preventDefault();   
          const message = {
            group: this.state.currentGroup,         
            text: this.refs.message.value.trim(),
            user: this.state.user.displayName,
            emails: Object.values(this.props.emails)
          }       
         
         if(typeof message.text === 'string' && message.text.length > 0){           
          
            AppActions.saveMessage(message)  
            this.refs.message.value = '';
         }                
      }
      _onChange(){
        this.setState({currentGroup: AppStore.getCurrentGroup()});
        this.setState({messages: AppStore.getMessages()});
        this.setState({user: AppStore.getUser()});
     } 
}
 