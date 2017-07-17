import React, {Component} from 'react'
import ReadMessage from './ReadMessage'

export default class DisplayMessage extends Component {
  render() {
    return (
      <div>     
       <ul>
            {/*<div>
            { 
              Object.keys(this.props.personalMessage).map(function(keyName, keyIndex) {
       
                  return(
                       <ReadMessage keyName={keyName} key={keyIndex}/>
                     ) 
                })
            }
            </div>*/}

               <div>
                {
                  this.props.personalMessage.map((message, index) => {
                     return(
                       <ReadMessage message={message} key={index}/>
                     ) 
                  })
                }                            
              </div>
          
        </ul>

      </div>


    )
  }
}