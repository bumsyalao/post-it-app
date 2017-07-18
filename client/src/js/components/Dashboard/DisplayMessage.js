import React, {Component} from 'react'
import ReadMessage from './ReadMessage'
import ShowMessage from './ShowMessage'
import ArchivedBox from './ArchivedBox'

import AppActions from '../../actions/AppActions'
import AppStore from '../../stores/AppStore'

export default class DisplayMessage extends Component {
        constructor(props){
        super(props);
        this.state ={
           displayArchives: AppStore.getOpenArchive()    
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
    console.log(this.state.displayArchives)
        if(this.state.displayArchives) { 
            var display = <ArchivedBox />     
        } else {      
           var display =  
                  <ul>
                  {
                    this.props.personalMessage.map((message, index) => {
                        return(             
                          <ReadMessage message={message} key={index}/>      
                        ) 
                    })
                  }                                  
                  </ul>
        } 

    return (
      <div style={{border:'1px solid LightBlue'}}>     
      {display}
      </div>

    )
  }
  _onChange(){
        this.setState({displayArchives: AppStore.getOpenArchive()});
    } 
}