import React, {Component} from 'react'

export default class DisplayMessage extends Component {
  render() {
    return (
      <div>
      <h2>Message Board</h2>
      
        <ul>
            <li>
            { 
              Object.keys(this.props.personalMessage).map(function(keyName, keyIndex) {
                return(
                    <div key={keyIndex} onClick={() => console.log(keyName)}>  
                      <a href="#/dashboard" className="btn btn-default">  {keyName}</a>
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