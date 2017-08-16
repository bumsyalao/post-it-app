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
         this._onChange= this._onChange.bind(this)
    }

    componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount () {
      AppStore.removeChangeListener(this._onChange);
    } 

  
  render() {
    // console.log(this.props.emails)
    // console.log(this.state.messages)
        if(this.props.displayArchives == 'archive') { 
          var display = <ArchivedBox />  
        }else if(this.props.displayArchives == 'inbox') { 
          var display = <DisplayMessage />   
        } else if(this.props.displayArchives == 'group') {      
           var display =         
           <section id="showcase">
            <div id="messageArea" className="row">          
            <h4 style={{color:'black',float:'left'}}>  Users in {this.state.currentGroup} group </h4><br/>     
                {
          Object.keys(this.props.contact).map(function(keyName, keyIndex) {
                return(
                    <div style={{float:'right'}} key={keyIndex} onClick={() => console.log(keyName)}>  
                      <a href="#/dashboard" className="btn btn-default">  {keyName}</a>
                    </div>             
                )
               })       
            }
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

        } 
    return (
       <div>
      {display}
             {/*<div className="jumbotron">
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
            </div>*/}
 
      </div>
    )
  }

      handleSubmit(e){
          e.preventDefault();   
          const message = {
            group: this.state.currentGroup,         
            text: this.refs.message.value.trim(),
            user: this.state.user.displayName,
            emails: Object.values(this.props.emails ? this.props.emails : toastr.warning("Add atleast one person to this Group") ),
            numbers: Object.values(this.props.numbers),
            allUsers: Object.values(this.props.contact),
            notification: this.state.user.displayName+' posted in '+ this.state.currentGroup +' group',
            priority: this.refs.type.value  
          }       
         
         if(typeof message.text === 'string' && message.text.length > 0){                    
            AppActions.saveMessage(message)  
            console.log(message)
            this.refs.message.value = '';
         }             
      }
      _onChange(){
        this.setState({currentGroup: AppStore.getCurrentGroup()});
        this.setState({messages: AppStore.getMessages()});
        this.setState({user: AppStore.getUser()});
     } 
}
 