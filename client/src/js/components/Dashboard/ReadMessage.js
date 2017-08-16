import React, {Component} from 'react'
import ShowMessage from './ShowMessage'
import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore';
import SeenUsers from './SeenUsers'


/**
 * Show list of Users who have seen the message
 * 
 * @export
 * @class ReadMessage
 * @extends {Component}
 */
export default class ReadMessage extends Component {
      state = {
        showMe : false,
        user : AppStore.getUser()
      }

  render() {
       if(this.state.showMe) { 
               var message = <div> <div><input type="checkbox" name="messa" defaultChecked /> {this.props.message.text} <br/> posted by  {this.props.message.user} in <strong>{this.props.message.group}</strong> group &nbsp; Seen by<select> {this.props.seenUsers.map((seen, index) => {
                        return(             
                          <SeenUsers users={seen} key={index} />      
                        ) 
                    })  } 
                    </select>
               
               and others &nbsp; <a href="#/dashboard" onClick={() => AppActions.removeMessage(this.props.message)}>Archive</a></div><hr/></div>       
        } else {      
           var message = <div onClick={this.readMessage.bind(this)}><input type="checkbox" name="messa"  /> <a href="#" className="btn btn-default">  {this.props.message.text}</a>

           </div> 
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
    
    const seenMesage = {
      uid: this.props.message.uid,
      userName: this.state.user.displayName,
      groupName: this.props.message.group 
    }

    if(this.props.message.uid === undefined){
      console.log('Undefined')
    }else{
      AppActions.seenMessage(seenMesage)
    }
    
  }

 


}