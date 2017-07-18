import React, {Component} from 'react'
import ReadMessage from './ReadMessage'
import ShowMessage from './ShowMessage'

export default class DisplayMessage extends Component {
  render() {
    return (
      <div style={{border:'1px solid LightBlue'}}>     
       <ul>
        {
          this.props.personalMessage.map((message, index) => {
              return(
              
                <ReadMessage message={message} key={index}/>
       
              ) 
          })
        }                                  
        </ul>
      </div>


    )
  }
}