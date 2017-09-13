import React, {Component} from 'react';
import Message from './Message';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import toastr from 'toastr';
import moment from 'moment';

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
        this.state = {
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
    return (
       <div className="message-board">      
             <div className="message-display-board">
             <h4>#{this.state.currentGroup}</h4>
              <div style={{color: 'black', textAlign: 'left'}} className="list-styles">
                 {
                  this.state.messages.map((message, index) => {
                     return(
                       <Message message={message} key={index} group={this.state.currentGroup}/>
                     ) 
                  })
                }                           
              </div>
            </div>

      
            <section id="showcase">
            <div id="messageArea" className="row">   

          <div className="col-md-12">
            <div className="chat" id="chat" />
            
            
            
            <form id="messageForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="message-row form-group">
               <div className="row">
                <div className="col-md-9">
                <textarea className="form-control" id="message" ref='message' placeholder="Enter Message"/>
                <select ref="type" style={{color:'black',float:'left'}} className="select_btn">
                        <option value='Normal'>Normal</option>
                        <option value='Urgent'>Urgent</option>
                        <option value='Critical'>Critical</option>
                </select> 
                </div>
                <div className="col-md-3">
                  <input type="submit" className="btn btn-primary" defaultValue="Post Message" />           
               </div>
              </div>
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
            user: this.state.user.displayName,
            group: this.state.currentGroup ,     
            text: this.refs.message.value.trim(),
            Time: moment().format('h:mm a'),
            notification: this.state.user.displayName+' posted in '+ this.state.currentGroup +' group',
            priority: this.refs.type.value  
          }       
         
         if(typeof message.text === 'string' && message.text.length > 0){                    
             AppActions.saveMessage(message)  
             console.log(message)
            this.refs.message.value = '';
         }             
      }
      onChange(){
        this.setState({currentGroup: AppStore.getCurrentGroup()});
        this.setState({messages: AppStore.getMessages()});
        this.setState({user: AppStore.getUser()});
     } 
}
 