import React, {Component} from 'react'
import ReadMessage from './ReadMessage'
import ShowMessage from './ShowMessage'
import ArchivedBox from './ArchivedBox'
import MessageBoard from './MessageBoard'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'

export default class DisplayMessage extends Component {
        constructor(props){
        super(props);
        this.state ={
           displayArchives: AppStore.getOpenArchive(),
           personalMessage: AppStore.getPersonalMessage()    
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
        if(this.state.displayArchives == 'archive') { 
            var display = <ArchivedBox />     
        } else if (this.state.displayArchives == 'inbox'){      
           var display =   this.state.personalMessage.map((message, index) => {
                        return(             
                          <ReadMessage message={message} key={index}/>      
                        ) 
                    })            
        } else if(this.state.displayArchives == 'group'){
            var display = <MessageBoard />  
        }

    return (
      <div style={{border:'1px solid LightBlue'}}>  
        <ul>
                {display}                 
        </ul>
      </div>

    )
  }
  _onChange(){
        this.setState({displayArchives: AppStore.getOpenArchive()});
        this.setState({personalMessage: AppStore.getPersonalMessage()});
    } 
}