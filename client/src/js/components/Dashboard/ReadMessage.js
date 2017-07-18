import React, {Component} from 'react'
import ShowMessage from './ShowMessage'

export default class ReadMessage extends Component {
      state = {
        showMe : false 
      }

  render() {
       if(this.state.showMe) { 
         
          
            //  var message = <ReadMessage message={this.props.message.text}/>
               var message = <li> <input type="checkbox" name="messa" value="seen" checked />  <div> <div>{this.props.message.text}</div><br/> </div></li>
              // var message = <div><li>{this.props.message.text}</li><br/></div>
             
            
        } else { 
        
           var message = <div> <input type="checkbox" name="messa" value="seen"/>  <li style={{textDecoration:'none'}} onClick={this.readMessage.bind(this)}> <a href="#" className="btn btn-default">  {this.props.message.user} posted in <strong>{this.props.message.group}</strong> group</a> </li></div> 
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

  }
}