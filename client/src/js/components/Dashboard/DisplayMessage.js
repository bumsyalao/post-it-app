import React, {Component} from 'react'

export default class DisplayMessage extends Component {
  render() {
    return (
      <div>
      <h4>Message Board</h4>
      
        <ul>
            <li>
            { 
              Object.keys(this.props.personalMessage).map(function(keyName, keyIndex) {
                return(
                    <div key={keyIndex} onClick={() => console.log(keyName)}>  
                   {keyName}
                    </div>             
                )
                })
            }
            </li>
          
        </ul>

      </div>

    )
  }
}