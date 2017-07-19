import React, {Component} from 'react'
import AppStore from '../../stores/AppStore'
import ArchiveMessage from './ArchiveMessage'

export default class ArchivedBox extends Component {
        constructor(props){
        super(props);
        this.state ={
           archives: AppStore.getArchiveMessage()    
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
      if(this.state.archives == ''){
          var display =   <li> You Currently do not have any Archived Message</li>
              
      }else{
          var display =   this.state.archives.map((message, index) => {
                    return(             
                        <ArchiveMessage message={message} key={index}/>      
                    ) 
                })
      }
    return (
      <div>
            <ul>
                {display}                 
           </ul>

      </div>

    )
  }
      _onChange(){
        this.setState({archives: AppStore.getArchiveMessage()});
    } 
}