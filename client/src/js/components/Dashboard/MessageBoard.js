import React, {Component} from 'react'
import Message from './Message'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'
import DisplayMessage from './DisplayMessage'
import ArchivedBox from './ArchivedBox'
import toastr from 'toastr'


/**
 * The Presentation component that servers all message activities
 * 
 * @export
 * @class MessageBoard
 * @extends {Component}
 */
export default class MessageBoard extends Component {
     constructor(props){
        super(props);
        this.state ={
            user : AppStore.getUser(),
            currentGroup : AppStore.getCurrentGroup(),     
            messages : AppStore.getMessages()     
        };
         this.onChange= this.onChange.bind(this)
    }

    componentWillMount ()  {
     AppStore.addChangeListener(this.onChange);
    }
    componentWillUnmount () {
      AppStore.removeChangeListener(this.onChange);
    } 

  
  render() {
    console.log(this.state.messages)
    return (
       <div>
             <div className="jumbotron">
              <ul style={{color: 'black', textAlign: 'left'}}>
                 {
                  this.state.messages.map((message, index) => {
                     return(
                       <Message message={message} key={index}/>
                     ) 
                  })
                }                            
              </ul>
            </div>
            <section id="showcase">
            <div id="messageArea" className="row">   
                  
        
                     <div className="col-md-12">
            <div className="chat" id="chat" />
            <form id="messageForm" onSubmit={this.handleSubmit.bind(this)}>
        
              <div className="form-group">
                <label>Enter Message</label>
                <textarea className="form-control" id="message" ref='message' placeholder="Enter Message"/>
                <select ref="type" style={{color:'black',float:'left'}}>
                        <option value='Normal'>Normal</option>
                        <option value='Urgent'>Urgent</option>
                        <option value='Critical'>Critical</option>
                </select> 
                <br />
                <input type="submit" className="btn btn-primary" defaultValue="Post Message" />           
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
            // group: this.state.currentGroup,   
            group: 'Cvvv',        
            text: this.refs.message.value.trim(),
            notification: this.state.user.displayName+' posted in '+ this.state.currentGroup +' group',
            priority: this.refs.type.value  
          }       
         
         if(typeof message.text === 'string' && message.text.length > 0){                    
             AppActions.saveMessage(message)  
            this.refs.message.value = '';
         }             
      }
      onChange(){
        this.setState({currentGroup: AppStore.getCurrentGroup()});
        this.setState({messages: AppStore.getMessages()});
        this.setState({user: AppStore.getUser()});
     } 
}
 